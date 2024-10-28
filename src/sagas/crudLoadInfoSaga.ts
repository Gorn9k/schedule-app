import {call, put, race, select, take, takeLatest} from 'redux-saga/effects';
import {
    cancelAuth,
    createLoadInfo,
    crudLoadInfoSuccess, deleteLoadInfo, editLoadInfo,
    setAuth,
    setErrorMessage,
    setFormFieldsErrors, setNavigateTo,
    setShowAuthModal
} from "../redux/modalSlice";
import {createSchedule219, deleteSchedule219, editSchedule219, Schedule219} from "../api/schedule-backend-api";
import {PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../redux/store";
import {Action} from "redux-saga";
import {addLoadInfo, removeLoadInfo, updateLoadInfo} from "../redux/scheduleSlice";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../utils/dates";

function* handleError(error: any, defaultErrorMessage: string): Generator<any, void, any> {
    if (axios.isAxiosError(error)) {
        if (error?.response?.status === 403) {
            const showAuthModal = yield select((state: RootState) => state.modal.showAuthModal)
            if (showAuthModal)
                yield put(setFormFieldsErrors(
                    {
                        field: 'incorrectValues',
                        errorMessage: 'Неверно введены логин или пароль'
                    }
                ))
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
}

function* isInCurrentDaysPeriod(value: Date): Generator<any, boolean, Date> {

    const startDate = yield select((state: RootState) => new Date(state.schedule.startDateTime as number))
    const endDate = yield select((state: RootState) => new Date(state.schedule.endDateTime as number))

    const isIn = value.getTime() >= startDate.getTime() && value.getTime() <= endDate.getTime()

    const startDateString= new Date(generateStartDateMilliseconds(value)).toLocaleDateString('en-CA')
    const endDateString = new Date(generateEndDateMilliseconds(value)).toLocaleDateString('en-CA')

    if (!isIn)
        yield put(setNavigateTo(`/loads-info?startDate=${startDateString}&endDate=${endDateString}`));

    return isIn
}

function* createLoadInfoSaga(action: PayloadAction<{
    loadInfo: Schedule219
}>): Generator<any, void, AxiosResponse<Schedule219> | boolean> {
    try {
        const response = (yield call(createSchedule219, action.payload.loadInfo, localStorage.getItem('authToken'))) as AxiosResponse<Schedule219>
        if ((yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date))) as boolean) {
            const location = response.headers['location']
            response.data.id = Number
                .parseInt(location.split('/')[location.split('/').length - 1])
            yield put(addLoadInfo(response.data))
        }
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(error, 'Не удалось сохранить нагрузку')
    }

    const result = yield race({
        success: take(setAuth.type),
        canceled: take(cancelAuth.type)
    });

    if ((result as { success?: Action, canceled?: Action }).canceled) {
        return
    } else
        yield put(action)
}

function* updateLoadInfoSaga(action: PayloadAction<{
    loadInfo: Schedule219
}>): Generator<any, void, AxiosResponse<Schedule219>> {
    try {
        yield call(editSchedule219, action.payload.loadInfo, localStorage.getItem('authToken'));
        if (yield call(isInCurrentDaysPeriod, new Date(action.payload.loadInfo.date)))
            yield put(updateLoadInfo(action.payload.loadInfo))
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(error, 'Не удалось обновить нагрузку')
    }

    const result = yield race({
        success: take(setAuth.type),
        canceled: take(cancelAuth.type)
    });

    if ((result as { success?: Action, canceled?: Action }).canceled) {
        return
    } else
        yield put(action)
}

function* deleteLoadInfoSaga(action: PayloadAction<number>): Generator<any, void, any> {
    try {
        yield call(deleteSchedule219, action.payload, localStorage.getItem('authToken'))
        yield put(removeLoadInfo(action.payload))
        yield put(crudLoadInfoSuccess())
        return
    } catch (error) {
        yield* handleError(error, 'Не удалось удалить нагрузку')
    }

    const result = yield race({
        success: take(setAuth.type),
        canceled: take(cancelAuth.type)
    });

    if ((result as { success?: Action, canceled?: Action }).canceled) {
        return
    } else
        yield put(action)
}

export default function* crudLoadInfoSaga() {
    yield takeLatest(createLoadInfo.type, createLoadInfoSaga);
    yield takeLatest(editLoadInfo.type, updateLoadInfoSaga);
    yield takeLatest(deleteLoadInfo.type, deleteLoadInfoSaga);
}