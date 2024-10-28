import {call, CallEffect, put, PutEffect, select, SelectEffect, take, TakeEffect, takeLatest} from "redux-saga/effects";
import {getSchedule, Schedule} from "../api/schedule-backend-api";
import {
    fetchLoadsInfo,
    fetchSchedule,
    repeatFetchLoadsInfo,
    repeatFetchSchedule,
    setErrorMessage,
    setLoadsInfo,
    setSchedule
} from "../redux/scheduleSlice";
import {RootState} from "../redux/store";
import {AxiosResponse} from "axios";

function* fetchScheduleRequestSaga(startDate: string, endDate: string, frame: string): Generator<CallEffect | PutEffect, void, AxiosResponse<Schedule, {message: string}>> {
    const response = yield call(getSchedule, startDate, endDate, frame)
    yield put(setSchedule(response.data))
}

function* fetchLessonsSaga(): Generator<CallEffect | PutEffect | TakeEffect | SelectEffect, void, Schedule | string> {
    try {
        const startDate = (yield select((state: RootState) =>
            new Date(state.schedule.startDateTime as number).toLocaleDateString('en-CA'))) as string
        const endDate = (yield select((state: RootState) =>
            new Date(state.schedule.endDateTime as number).toLocaleDateString('en-CA'))) as string
        const frame = (yield select((state: RootState) => state.schedule.frame as string)) as string
        const response = (yield call(() => getSchedule(startDate, endDate, frame))) as Schedule
        yield put(setSchedule(response))
        return
    } catch (error) {
        yield put(setErrorMessage('Не удалось получить расписание из диспетчерской'))
    }

    yield take(repeatFetchSchedule.type)

    yield put(fetchSchedule())
}

function* fetchLoadsInfoRequestSaga(startDate: string, endDate: string): Generator<CallEffect | PutEffect, void, Schedule219[]> {
    const response = yield call(getSchedule219, startDate, endDate)
    yield put(setLoadsInfo(response))
}

function* fetchLoadsInfoSaga(): Generator<CallEffect | PutEffect | TakeEffect | SelectEffect, void, string> {
    try {
        const startDate = yield select((state: RootState) =>
            new Date(state.schedule.startDateTime as number).toLocaleDateString('en-CA'))
        const endDate = yield select((state: RootState) =>
            new Date(state.schedule.endDateTime as number).toLocaleDateString('en-CA'))
        yield call(fetchLoadsInfoRequestSaga, startDate, endDate)
        return
    } catch (error) {
        yield put(setErrorMessage('Не удалось получить расписание из диспетчерской'))
    }

    yield take(repeatFetchLoadsInfo.type)

    yield put(fetchLoadsInfo())
}

export default function* fetchScheduleSaga() {
    yield takeLatest(fetchSchedule.type, fetchLessonsSaga);
    yield takeLatest(fetchLoadsInfo.type, fetchLoadsInfoSaga);
}