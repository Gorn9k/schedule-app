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
    takeEvery
} from 'redux-saga/effects';
import {
    abortDeleteLoadInfo,
    addOperableId,
    cancelAuth,
    createLoadInfoInit,
    crudLoadInfoCompleted,
    deleteLoadInfoInit,
    editLoadInfoInit,
    removeOperableId,
    setAuth,
    setErrorMessage,
    setFormFieldsErrors, setIsLoading,
    setLoadInfo,
    setNavigateTo, setShowAuthModal, setShowLoadInfoModal,
    tryDeleteLoadInfo
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
        if (error?.response?.status && error.response.status >= 400) {
            if (error.response.status === 403 || error.response.status === 401) {
                error.response.status === 403 && localStorage.getItem('authToken') && localStorage.removeItem('authToken')
                yield put(setShowAuthModal(true))
            }
            if (typeof error.response.data === 'object' && Object.keys(error.response.data).length > 0) {
                yield put(setFormFieldsErrors(error.response.data))
                yield put(setIsLoading(false))
            } else
                yield put(setErrorMessage(error.response.data))
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
        yield put(setNavigateTo(`/loads-info-schedule?startDate=${startDateString}&endDate=${endDateString}`));

    return isIn
}

function* createLoadInfoSaga(action: PayloadAction<{ loadInfo: LoadInfo }>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, AxiosResponse<void> | boolean | {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    try {
        yield put(setFormFieldsErrors(null))
        const response = (yield call(createLoadInfo, action.payload.loadInfo, localStorage.getItem('authToken'))) as AxiosResponse<void>
        if ((yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date))) as boolean) {
            const location = response.headers['location'] as string
            const loadInfoWithId = {
                ...action.payload.loadInfo,
                id: Number.parseInt(location.split('/').pop() as string, 10)
            };
            yield put(addLoadInfo(loadInfoWithId));
        }
        yield put(crudLoadInfoCompleted())
        return
    } catch (error) {
        yield put(setShowLoadInfoModal(true))
        yield put(setLoadInfo(action.payload.loadInfo))
        yield* handleError(action, error, 'Не удалось сохранить нагрузку')
    }
}

function* updateLoadInfoSaga(action: PayloadAction<{ loadInfo: LoadInfo }>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, boolean | {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    try {
        yield put(setFormFieldsErrors(null))
        yield call(editLoadInfo, action.payload.loadInfo, localStorage.getItem('authToken'));
        if ((yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date))) as boolean)
            yield put(updateLoadInfo(action.payload.loadInfo))
        yield put(crudLoadInfoCompleted())
        yield put(removeOperableId(action.payload.loadInfo.id as number))
        return
    } catch (error) {
        yield put(setShowLoadInfoModal(true))
        yield put(setLoadInfo(action.payload.loadInfo))
        yield put(removeOperableId(action.payload.loadInfo.id as number))
        yield* handleError(action, error, 'Не удалось обновить нагрузку')
    }
}

function* deleteLoadInfoSaga(action: PayloadAction<number>):
    Generator<CallEffect | PutEffect | TakeEffect | RaceEffect<TakeEffect> | SelectEffect, void, {
        success?: TakeEffect,
        canceled?: TakeEffect
    }> {
    try {
        yield put(setFormFieldsErrors(null))
        const result = (yield race({
            success: take(tryDeleteLoadInfo.type),
            canceled: take(abortDeleteLoadInfo.type)
        })) as { success?: TakeEffect, canceled?: TakeEffect }

        if (result.canceled)
            return

        yield put(addOperableId(action.payload))
        yield call(deleteLoadInfo, action.payload, localStorage.getItem('authToken'))
        yield put(removeLoadInfo(action.payload))
        yield put(crudLoadInfoCompleted())
        yield put(removeOperableId(action.payload))
        return
    } catch (error) {
        yield put(removeOperableId(action.payload))
        yield* handleError(action, error, 'Не удалось удалить нагрузку')
    }
}

export default function* crudLoadInfoSaga() {
    yield takeEvery(createLoadInfoInit.type, createLoadInfoSaga);
    yield takeEvery(editLoadInfoInit.type, updateLoadInfoSaga);
    yield takeEvery(deleteLoadInfoInit.type, deleteLoadInfoSaga);
}