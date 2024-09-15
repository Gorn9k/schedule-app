import {createSlice} from '@reduxjs/toolkit'

export const generateCurrentStartDate = (): number => {
    const today = new Date()
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const firstDayOfWeek = today.getDate() - (today.getDay() === 0 ? 7 : today.getDay()) + 1

    return today.setDate(firstDayOfWeek)
}

export const generateCurrentEndDate = (): number => {
    const today = new Date();
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const lastDayOfWeek = today.getDate() + (today.getDay() === 0 ? 0 : 7 - today.getDay())

    return today.setDate(lastDayOfWeek)
}

type CurrentWeekPeriodState = {
    startDateTime: number
    endDateTime: number
}

const initialState: CurrentWeekPeriodState = {
    startDateTime: generateCurrentStartDate(),
    endDateTime: generateCurrentEndDate(),
}

const currentWeekPeriodSlice = createSlice({
    name: "currentWeekPeriod",
    initialState,
    reducers: {
        reset: (state: CurrentWeekPeriodState) => {
            state.startDateTime = generateCurrentStartDate()
            state.endDateTime = generateCurrentEndDate()
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