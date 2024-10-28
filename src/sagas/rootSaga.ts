import { all } from 'redux-saga/effects';
import crudLoadInfoSaga from "./crudLoadInfoSaga";
import fetchScheduleSaga from "./fetchScheduleSaga";

export default function* rootSaga() {
    yield all([
        crudLoadInfoSaga(),
        fetchScheduleSaga()
    ]);
}