import {call, put, race, select, take, takeLatest} from 'redux-saga/effects';
import {
    cancelAuth,
    createLoadInfo,
    crudLoadInfoSuccess,
    deleteLoadInfo,
    setAuth,
    setErrorMessage,
    setFormFieldsErrors,
    setIsLoading,
    setNavigateTo,
    setShowAuthModal,
    updateLoadInfo
} from "../redux/loadInfoSlice";
import {createSchedule219, deleteSchedule219, editSchedule219, Schedule219} from "../api/schedule-backend-api";
import {PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../redux/store";
import {Action} from "redux-saga";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../utils/dates";

type CrudFunction<T> = T extends Schedule219 ?
    (value: Schedule219, authToken: string | null) => Promise<AxiosResponse<any, any>> :
    (value: number, authToken: string | null) => Promise<AxiosResponse<any, any>>;

function* handleCrudOperation<T extends Schedule219 | number>(crudFunction: CrudFunction<T>,
                                                              functionParam: T,
                                                              defaultErrorMessage: string): Generator<any, void, any> {
    while (true) {
        try {
            yield call({
                context: null,
                fn: crudFunction as any
            }, functionParam, localStorage.getItem('authToken'));
            yield put(crudLoadInfoSuccess());
            if (typeof functionParam !== 'number') {
                const startDate = new Date(generateStartDateMilliseconds(new Date(functionParam.date))).toLocaleDateString('en-CA')
                const endDate = new Date(generateEndDateMilliseconds(new Date(functionParam.date))).toLocaleDateString('en-CA')
                yield put(setNavigateTo(`/loads-info?startDate=${startDate}&endDate=${endDate}`))
            }
            return
        } catch (error) {
            yield* handleError(error, defaultErrorMessage)
        } finally {
            yield put(setIsLoading(false))
        }
        const result = yield race({
            success: take(setAuth().type),
            canceled: take(cancelAuth().type)
        });

        if ((result as { success?: Action, canceled?: Action }).canceled) {
            return
        } else
            yield put(setIsLoading(true))
    }
}

function* handleError(error: any, defaultErrorMessage: string): Generator<any, void, any> {
    if (axios.isAxiosError(error)) {
        if (error?.response?.status === 403) {
            const showAuthModal = yield select((state: RootState) => state.loadInfo.modal.showAuthModal)
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
    }
}

function* createLoadInfoSaga(action: PayloadAction<{
    loadInfo: Schedule219
}>): Generator<any, void, any> {
    yield* handleCrudOperation(createSchedule219, action.payload.loadInfo,
        'Не удалось сохранить нагрузку')
}

function* updateLoadInfoSaga(action: PayloadAction<{
    loadInfo: Schedule219
}>): Generator<any, void, any> {
    yield* handleCrudOperation(editSchedule219, action.payload.loadInfo,
        'Не удалось обновить нагрузку')
}

function* deleteLoadInfoSaga(action: PayloadAction<number>): Generator<any, void, any> {
    yield* handleCrudOperation(deleteSchedule219, action.payload,
        'Не удалось удалить нагрузку')
}

export default function* crudLoadInfoSaga() {
    yield takeLatest(createLoadInfo.type, createLoadInfoSaga);
    yield takeLatest(updateLoadInfo.type, updateLoadInfoSaga);
    yield takeLatest(deleteLoadInfo.type, deleteLoadInfoSaga);
}