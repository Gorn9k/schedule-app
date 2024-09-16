import {createSlice} from '@reduxjs/toolkit'
import {generateCurrentEndDateMilliseconds, generateCurrentStartDateMilliseconds} from "../utils/dates";

type CurrentWeekPeriodState = {
    startDateTime: number
    endDateTime: number
}

const initialState: CurrentWeekPeriodState = {
    startDateTime: generateCurrentStartDateMilliseconds(),
    endDateTime: generateCurrentEndDateMilliseconds(),
}

const currentWeekPeriodSlice = createSlice({
    name: "currentWeekPeriod",
    initialState,
    reducers: {
        reset: (state: CurrentWeekPeriodState) => {
            state.startDateTime = generateCurrentStartDateMilliseconds()
            state.endDateTime = generateCurrentEndDateMilliseconds()
        },
        next: (state: CurrentWeekPeriodState) => {
            state.startDateTime += 7 * 24 * 60 * 60 * 1000
            state.endDateTime += 7 * 24 * 60 * 60 * 1000
        },
        prev: (state: CurrentWeekPeriodState) => {
            state.startDateTime -= 7 * 24 * 60 * 60 * 1000
            state.endDateTime -= 7 * 24 * 60 * 60 * 1000
        }
    }
})

export const {
    reset,
    next,
    prev
} = currentWeekPeriodSlice.actions

export default currentWeekPeriodSlice.reducer