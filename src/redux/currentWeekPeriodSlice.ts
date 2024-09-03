import {createSlice} from '@reduxjs/toolkit'
import {generateCurrentEndDate, generateCurrentStartDate} from "../components/mainPage/MainPage"

type CurrentWeekPeriodState = {
    startDate: Date
    endDate: Date
}

const initialState: CurrentWeekPeriodState = {
    startDate: generateCurrentStartDate(),
    endDate: generateCurrentEndDate(),
}

const currentWeekPeriodSlice = createSlice({
    name: "currentWeekPeriod",
    initialState,
    reducers: {
        reset: (state: CurrentWeekPeriodState) => {
            state.startDate = generateCurrentStartDate()
            state.endDate = generateCurrentEndDate()
        },
        next: (state: CurrentWeekPeriodState) => {
            state.startDate = new Date(new Date().setDate(state.startDate.getDate() + 7))
            state.endDate = new Date(new Date().setDate(state.endDate.getDate() + 7))
        },
        prev: (state: CurrentWeekPeriodState) => {
            state.startDate = new Date(new Date().setDate(state.startDate.getDate() - 7))
            state.endDate = new Date(new Date().setDate(state.endDate.getDate() - 7))
        }
    }
})

export const {
    reset,
    next,
    prev
} = currentWeekPeriodSlice.actions

export default currentWeekPeriodSlice.reducer