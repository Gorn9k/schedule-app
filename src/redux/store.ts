import {combineReducers, configureStore} from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
    schedule: scheduleReducer,
    modal: modalReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;