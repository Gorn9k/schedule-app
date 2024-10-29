import {
    call,
    CallEffect,
    put,
    PutEffect,
    race,
    RaceEffect,
    select,
    SelectEffect,
    take,
    TakeEffect,
    takeLatest
} from 'redux-saga/effects';
import {
    cancelAuth,
    createLoadInfoInit,
    crudLoadInfoSuccess,
    deleteLoadInfoInit,
    editLoadInfoInit,
    setAuth,
    setErrorMessage,
    setFormFieldsErrors,
    setNavigateTo,
    setShowAuthModal
} from "../redux/modalSlice";
import {createLoadInfo, deleteLoadInfo, editLoadInfo, LoadInfo} from "../api/schedule-backend-api";
import {PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../redux/store";
import {Action} from "redux-saga";
import {addLoadInfo, removeLoadInfo, updateLoadInfo} from "../redux/scheduleSlice";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../utils/dates";

function* handleError(action: Action, error: any, defaultErrorMessage: string):
    Generator<SelectEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect>, void, void | AxiosResponse<void> | boolean | {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    if (axios.isAxiosError(error)) {
        if (error?.response?.status === 403) {
            const showAuthModal = (yield select((state: RootState) => state.modal.showAuthModal)) as boolean
            if (showAuthModal)
                yield put(setFormFieldsErrors(
                    {
                        field: 'incorrectValues',
                        errorMessage: 'Неверно введены логин или пароль'
                    }
                ))
            else
                yield put(setShowAuthModal(true))
            localStorage.getItem('authToken') && localStorage.removeItem('authToken')
        } else if (error?.response?.status === 400) {
            for (const [field, message] of Object.entries(error.response.data as {
                [key: string]: string
            })) {
                yield put(setFormFieldsErrors(
                    {
                        field: field,
                        errorMessage: message
                    }
                ))
            }
        } else
            yield put(setErrorMessage(defaultErrorMessage))
    } else {
        yield put(setErrorMessage(`Произошла неизвестная ошибка`))
        console.log(error)
    }

    const result = (yield race({
        success: take(setAuth.type),
        canceled: take(cancelAuth.type)
    })) as { success?: TakeEffect, canceled?: TakeEffect }

    if (result.canceled) {
        return
    } else
        yield put(action)
}

function* isInCurrentDaysPeriod(value: Date): Generator<SelectEffect | PutEffect, boolean, Date> {

    const startDate = yield select((state: RootState) => new Date(state.schedule.startDateTime as number))
    const endDate = yield select((state: RootState) => new Date(state.schedule.endDateTime as number))

    const isIn = value.getTime() >= startDate.getTime() && value.getTime() <= endDate.getTime()

    const startDateString = new Date(generateStartDateMilliseconds(value)).toLocaleDateString('en-CA')
    const endDateString = new Date(generateEndDateMilliseconds(value)).toLocaleDateString('en-CA')

    if (!isIn)
        yield put(setNavigateTo(`/loads-info?startDate=${startDateString}&endDate=${endDateString}`));

    return isIn
}

function* createLoadInfoSaga(action: PayloadAction<{ loadInfo: LoadInfo }>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, AxiosResponse<void> | boolean | {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    try {
        const response = (yield call(createLoadInfo, action.payload.loadInfo, localStorage.getItem('authToken'))) as AxiosResponse<void>
        if ((yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date))) as boolean) {
            const location = response.headers['location']
            action.payload.loadInfo.id = Number
                .parseInt(location.split('/')[location.split('/').length - 1])
            yield put(addLoadInfo(action.payload.loadInfo))
        }
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(action, error, 'Не удалось сохранить нагрузку')
    }
}

function* updateLoadInfoSaga(action: PayloadAction<{ loadInfo: LoadInfo }>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, boolean | {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    try {
        yield call(editLoadInfo, action.payload.loadInfo, localStorage.getItem('authToken'));
        if ((yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date))) as boolean)
            yield put(updateLoadInfo(action.payload.loadInfo))
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(action, error, 'Не удалось обновить нагрузку')
    }
}

function* deleteLoadInfoSaga(action: PayloadAction<number>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, void> {
    try {
        yield call(deleteLoadInfo, action.payload, localStorage.getItem('authToken'))
        yield put(removeLoadInfo(action.payload))
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(action, error, 'Не удалось удалить нагрузку')
    }
}

export default function* crudLoadInfoSaga() {
    yield takeLatest(createLoadInfoInit.type, createLoadInfoSaga);
    yield takeLatest(editLoadInfoInit.type, updateLoadInfoSaga);
    yield takeLatest(deleteLoadInfoInit.type, deleteLoadInfoSaga);
}