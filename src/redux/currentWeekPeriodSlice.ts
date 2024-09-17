import {createSlice} from '@reduxjs/toolkit'
import {
    generateCurrentEndDateMilliseconds,
    generateCurrentStartDateMilliseconds,
    generateNewWeekPeriodDateMilliseconds
} from "../utils/dates";

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
            state.startDateTime = generateNewWeekPeriodDateMilliseconds(state.startDateTime, 1)
            state.endDateTime = generateNewWeekPeriodDateMilliseconds(state.endDateTime, 1)
        },
        prev: (state: CurrentWeekPeriodState) => {
            state.startDateTime = generateNewWeekPeriodDateMilliseconds(state.startDateTime, -1)
            state.endDateTime = generateNewWeekPeriodDateMilliseconds(state.endDateTime, -1)
        }
    }
})

export const {
    reset,
    next,
    prev
} = currentWeekPeriodSlice.actions

export default currentWeekPeriodSlice.reducer