import {combineReducers, configureStore} from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';

const rootReducer = combineReducers({
    schedule: scheduleReducer
});

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;