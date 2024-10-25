import { all } from 'redux-saga/effects';
import crudLoadInfoSaga from "./crudLoadInfoSaga";

export default function* rootSaga() {
    yield all([
        crudLoadInfoSaga()
    ]);
}