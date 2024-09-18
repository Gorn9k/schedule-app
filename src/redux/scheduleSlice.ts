import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    generateCurrentEndDateMilliseconds,
    generateCurrentStartDateMilliseconds,
    generateNewWeekPeriodDateMilliseconds
} from "../utils/dates";

type ScheduleState = {
    startDateTime: number
    endDateTime: number
    frame: 'FIRST' | 'FOURTH' | null
    classes: string[] | null
    isOverflowing: boolean
    errorMessage: string | null
}

const initialState: ScheduleState = {
    startDateTime: generateCurrentStartDateMilliseconds(),
    endDateTime: generateCurrentEndDateMilliseconds(),
    frame: null,
    classes: null,
    isOverflowing: false,
    errorMessage: null
}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        reset: (state: ScheduleState) => {
            state.startDateTime = generateCurrentStartDateMilliseconds()
            state.endDateTime = generateCurrentEndDateMilliseconds()
            state.classes = null
            state.isOverflowing = false
            state.errorMessage = null
            state.frame = null
        },
        next: (state: ScheduleState) => {
            state.startDateTime = generateNewWeekPeriodDateMilliseconds(state.startDateTime, 1)
            state.endDateTime = generateNewWeekPeriodDateMilliseconds(state.endDateTime, 1)
            state.classes = null
            state.isOverflowing = false
            state.errorMessage = null
        },
        prev: (state: ScheduleState) => {
            state.startDateTime = generateNewWeekPeriodDateMilliseconds(state.startDateTime, -1)
            state.endDateTime = generateNewWeekPeriodDateMilliseconds(state.endDateTime, -1)
            state.classes = null
            state.isOverflowing = false
            state.errorMessage = null
        },
        setStartDateTime: (state: ScheduleState, action: PayloadAction<number>) => {
            state.startDateTime = action.payload
        },
        setEndDateTime: (state: ScheduleState, action: PayloadAction<number>) => {
            state.endDateTime = action.payload
        },
        setFrame: (state: ScheduleState, action: PayloadAction<'FIRST' | 'FOURTH'>) => {
            state.frame = action.payload
        },
        setIsOverflowing: (state: ScheduleState, action: PayloadAction<boolean>) => {
            state.isOverflowing = action.payload
        },
        setError: (state: ScheduleState, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload
        },
        setClasses: (state: ScheduleState, action: PayloadAction<string[] | null>) => {
            state.classes = action.payload
        }
    }
})

export const {
    reset,
    next,
    prev,
    setClasses,
    setEndDateTime,
    setFrame,
    setIsOverflowing,
    setStartDateTime,
    setError
} = scheduleSlice.actions

export default scheduleSlice.reducer