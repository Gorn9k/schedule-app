import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentWeekPeriodReducer from './currentWeekPeriodSlice';
import connectionErrorMessageReducer from "./connectionErrorMessageSlice";

const rootReducer = combineReducers({
    currentWeekPeriod: currentWeekPeriodReducer,
    connectionErrorMessage: connectionErrorMessageReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;