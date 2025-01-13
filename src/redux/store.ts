import {combineReducers, configureStore} from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';
import modalReducer from './modalSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas/rootSaga";

const rootReducer = combineReducers({
    schedule: scheduleReducer,
    modal: modalReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;