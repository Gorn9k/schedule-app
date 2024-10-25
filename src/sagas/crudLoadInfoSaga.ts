import {call, put, race, select, take, takeLatest} from 'redux-saga/effects';
import {
    cancelAuth,
    createLoadInfo,
    createLoadInfoSuccess,
    setAuth,
    setErrorMessage,
    setFormFieldsErrors, setIsLoading,
    setShowAuthModal
} from "../redux/modalSlice";
import {createSchedule219, Schedule219} from "../api/schedule-backend-api";
import {PayloadAction} from "@reduxjs/toolkit";
import {NavigateFunction} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {RootState} from "../redux/store";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../utils/dates";

type CrudFunction<T> = T extends Schedule219 ?
    (value: Schedule219, authToken: string | null) => Promise<AxiosResponse<any, any>> :
    (value: number, authToken: string | null) => Promise<AxiosResponse<any, any>>;

function* defaultCrudFunction<T extends Schedule219 | number>(crudFunction: CrudFunction<T>,
                                                              functionParam: T): Generator<any, void> {
    while (true) {
        try {
            const response = yield call({context: null, fn: crudFunction as any}, functionParam, localStorage.getItem('authToken'));
            yield put(createLoadInfoSuccess());
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 403) {
                    yield select((state: RootState) => state.modal.showAuthModal) && put(setFormFieldsErrors(
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
                    throw new Error()
            } else {
                yield put(setErrorMessage(`Произошла неизвестная ошибка`))
            }
        } finally {
            yield put(setIsLoading(false))
        }
        const {canceled} = yield race({
            success: take(setAuth().type),
            canceled: take(cancelAuth().type)
        });

        if (canceled) {
            return
        }
    }
}

function* createLoadInfoSaga(action: PayloadAction<{
    loadInfo: Schedule219
}>): Generator<any, void> {
    try {
        yield* defaultCrudFunction(createSchedule219, action.payload.loadInfo)
        // const startDate = new Date(generateStartDateMilliseconds(new Date(action.payload.loadInfo.date))).toLocaleDateString('en-CA')
        // const endDate = new Date(generateEndDateMilliseconds(new Date(action.payload.loadInfo.date))).toLocaleDateString('en-CA')
        // action.payload.navigate(`/loads-info?startDate=${startDate}&endDate=${endDate}`)
    } catch (error) {
        yield put(setErrorMessage(`Не удалось сохранить нагрузку`))
    }
}

export default function* crudLoadInfoSaga() {
    yield takeLatest(createLoadInfo.type, createLoadInfoSaga);
}