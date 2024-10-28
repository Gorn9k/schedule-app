import {call, CallEffect, put, PutEffect, select, SelectEffect, take, TakeEffect, takeLatest} from "redux-saga/effects";
import {getSchedule, getSchedule219, Schedule, Schedule219} from "../api/schedule-backend-api";
import {
    fetchLoadsInfo,
    fetchSchedule,
    repeatFetchLoadsInfo,
    repeatFetchSchedule,
    setErrorMessage,
    setIsLoading,
    setLoadsInfo,
    setSchedule
} from "../redux/scheduleSlice";
import {RootState} from "../redux/store";

function* fetchScheduleRequestSaga(startDate: string, endDate: string, frame: string): Generator<CallEffect | PutEffect, void, Schedule> {
    const response = yield call(getSchedule, startDate, endDate, frame)
    yield put(setSchedule(response))
}

function* fetchLessonsSaga(): Generator<CallEffect | PutEffect | TakeEffect | SelectEffect, void, string> {
    while(true) {
        try {
            const startDate = yield select((state: RootState) =>
                new Date(state.schedule.startDateTime as number).toLocaleDateString('en-CA'))
            const endDate = yield select((state: RootState) =>
                new Date(state.schedule.endDateTime as number).toLocaleDateString('en-CA'))
            const frame = yield select((state: RootState) => state.schedule.frame as string)
            yield call(fetchScheduleRequestSaga, startDate, endDate, frame)
            return
        } catch (error) {
            yield put(setErrorMessage('Не удалось получить расписание из диспетчерской'))
        }

        yield take(repeatFetchSchedule.type)

        yield put(setIsLoading(true))
    }
}

function* fetchLoadsInfoRequestSaga(startDate: string, endDate: string): Generator<CallEffect | PutEffect, void, Schedule219[]> {
    const response = yield call(getSchedule219, startDate, endDate)
    yield put(setLoadsInfo(response))
}

function* fetchLoadsInfoSaga(): Generator<CallEffect | PutEffect | TakeEffect | SelectEffect, void, string> {
    while (true) {
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

        yield put(setIsLoading(true))
    }
}

export default function* fetchScheduleSaga() {
    yield takeLatest(fetchSchedule.type, fetchLessonsSaga);
    yield takeLatest(fetchLoadsInfo.type, fetchLoadsInfoSaga);
}