import {call, CallEffect, put, PutEffect, take, TakeEffect, takeLatest} from "redux-saga/effects";
import {
    getLoadsInfo,
    getSchedule,
    LoadInfo,
    LoadInfoParams,
    Schedule,
    ScheduleParams
} from "../api/schedule-backend-api";
import {
    fetchLoadsInfo,
    fetchSchedule,
    repeatFetchLoadsInfo,
    repeatFetchSchedule,
    setErrorMessage,
    setLoadsInfo,
    setSchedule
} from "../redux/scheduleSlice";
import {PayloadAction} from "@reduxjs/toolkit";

function* fetchLessonsSaga(action: PayloadAction<ScheduleParams>): Generator<CallEffect | PutEffect | TakeEffect, void, Schedule> {
    try {
        const response = yield call(getSchedule, action.payload.startDate, action.payload.endDate, action.payload.frame)
        yield put(setSchedule(response))
        return
    } catch (error) {
        yield put(setErrorMessage('Не удалось получить расписание из диспетчерской'))
    }

    yield take(repeatFetchSchedule.type)

    yield put(action)
}

function* fetchLoadsInfoSaga(action: PayloadAction<LoadInfoParams>): Generator<CallEffect | PutEffect | TakeEffect, void, LoadInfo[]> {
    try {
        const response = yield call(getLoadsInfo, action.payload.startDate, action.payload.endDate)
        yield put(setLoadsInfo(response))
        return
    } catch (error) {
        yield put(setErrorMessage('Не удалось получить расписание из диспетчерской'))
    }

    yield take(repeatFetchLoadsInfo.type)

    yield put(action)
}

export default function* fetchScheduleSaga() {
    yield takeLatest(fetchSchedule.type, fetchLessonsSaga);
    yield takeLatest(fetchLoadsInfo.type, fetchLoadsInfoSaga);
}