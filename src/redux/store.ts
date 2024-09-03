import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentWeekPeriodReducer from './currentWeekPeriodSlice';

const rootReducer = combineReducers({
    currentWeekPeriod: currentWeekPeriodReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;