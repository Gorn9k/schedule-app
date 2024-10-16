import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type FrameType = 'FIRST' | 'FOURTH' | 'NONE' | null

type ScheduleState = {
    startDateTime: number | null
    endDateTime: number | null
    frame: FrameType
}

const initialState: ScheduleState = {
    startDateTime: null,
    endDateTime: null,
    frame: null
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
        }
    }
})

export const {
    resetScheduleState,
    setStartDateTime,
    setEndDateTime,
    setFrame
} = scheduleSlice.actions

export default scheduleSlice.reducer