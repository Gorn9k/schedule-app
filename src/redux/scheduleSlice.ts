import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Schedule, Schedule219} from "../api/schedule-backend-api";

export type FrameType = 'FIRST' | 'FOURTH' | undefined

type ScheduleState = {
    startDateTime: number | null
    endDateTime: number | null
    frame: FrameType | null
    scheduleList: Schedule | null
    loadsInfo: Schedule219[]
    isLoading: boolean
    errorMessage: string | null
}

const initialState: ScheduleState = {
    startDateTime: null,
    endDateTime: null,
    frame: null,
    scheduleList: null,
    loadsInfo: [],
    isLoading: false,
    errorMessage: null
}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        resetScheduleState(state: ScheduleState) {
            state.startDateTime = state.endDateTime = state.frame = null
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
        addLoadInfo(state: ScheduleState, action: PayloadAction<Schedule219 | null>) {

        },
        setIsLoading(state: ScheduleState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setErrorMessage(state: ScheduleState, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload
        }
    }
})

export const {
    resetScheduleState,
    setStartDateTime,
    setEndDateTime,
    setFrame,
    addLoadInfo,
    setIsLoading,
    setErrorMessage
} = scheduleSlice.actions

export default scheduleSlice.reducer