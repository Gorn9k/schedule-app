import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentWeekPeriodReducer from './currentWeekPeriodSlice';
import connectionErrorMessageReducer from "./connectionErrorMessageSlice";
import overflowTableBodyReducer from "./overflowTableBodySlice";

const rootReducer = combineReducers({
    currentWeekPeriod: currentWeekPeriodReducer,
    connectionErrorMessage: connectionErrorMessageReducer,
    overflowTableBody: overflowTableBodyReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;