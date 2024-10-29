import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Lesson, LoadInfoParams, Schedule, LoadInfo, ScheduleParams} from "../api/schedule-backend-api";

export type FrameType = 'FIRST' | 'FOURTH' | undefined

type ScheduleState = {
    startDateTime: number | null
    endDateTime: number | null
    frame: FrameType | null
    lessons: Lesson[]
    classesNumbers: string[]
    days: number[]
    loadsInfo: LoadInfo[]
    isLoading: boolean
    errorMessage: string | null,
    isOverflowing: boolean
}

const initialState: ScheduleState = {
    startDateTime: null,
    endDateTime: null,
    frame: null,
    lessons: [],
    classesNumbers: [],
    days: [],
    loadsInfo: [],
    isLoading: true,
    errorMessage: null,
    isOverflowing: false
}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        resetScheduleState() {
            return initialState
        },
        setStartDateTime(state: ScheduleState, action: PayloadAction<number>) {
            state.startDateTime = action.payload
        },
        setEndDateTime(state: ScheduleState, action: PayloadAction<number>) {
            state.endDateTime = action.payload
        },
        setFrame(state: ScheduleState, action: PayloadAction<FrameType>) {
            state.frame = action.payload
        },
        addLoadInfo(state: ScheduleState, action: PayloadAction<LoadInfo>) {
            state.loadsInfo.push(action.payload)
        },
        updateLoadInfo(state: ScheduleState, action: PayloadAction<LoadInfo>) {
            Object.assign(state.loadsInfo.find(value => value.id === action.payload.id) as LoadInfo, action.payload)
        },
        removeLoadInfo(state: ScheduleState, action: PayloadAction<number>) {
            state.loadsInfo = state.loadsInfo.filter(value => value.id !== action.payload)
        },
        setErrorMessage(state: ScheduleState, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload
            state.isLoading = false
        },
        setIsOverflowing(state: ScheduleState, action: PayloadAction<boolean>) {
            state.isOverflowing = action.payload
        },
        setSchedule(state: ScheduleState, action: PayloadAction<Schedule>) {
            state.lessons = action.payload.lessons
            state.classesNumbers = action.payload.classesNumbers
            state.days = action.payload.days
            state.isLoading = false
        },
        fetchSchedule(state: ScheduleState, _action: PayloadAction<ScheduleParams>) {
            state.isLoading = true
            state.errorMessage = null
        },
        fetchLoadsInfo(state: ScheduleState, _action: PayloadAction<LoadInfoParams>) {
            state.isLoading = true
            state.errorMessage = null
        },
        setLoadsInfo(state: ScheduleState, action: PayloadAction<LoadInfo[]>) {
            state.loadsInfo = action.payload
            state.isLoading = false
        },
        repeatFetchSchedule(state: ScheduleState) {
            state.isLoading = true
            state.errorMessage = null
        },
        repeatFetchLoadsInfo(state: ScheduleState) {
            state.isLoading = true
            state.errorMessage = null
        }
    }
})

export const {
    resetScheduleState,
    setStartDateTime,
    setEndDateTime,
    setFrame,
    addLoadInfo,
    updateLoadInfo,
    removeLoadInfo,
    setErrorMessage,
    setIsOverflowing,
    setSchedule,
    fetchSchedule,
    fetchLoadsInfo,
    setLoadsInfo,
    repeatFetchLoadsInfo,
    repeatFetchSchedule
} = scheduleSlice.actions

export default scheduleSlice.reducer