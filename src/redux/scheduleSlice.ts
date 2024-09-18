import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type ScheduleState = {
    classes: string[] | null
    isOverflowing: boolean
    errorMessage: string | null
}

const initialState: ScheduleState = {
    classes: null,
    isOverflowing: false,
    errorMessage: null
}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        resetScheduleState(state: ScheduleState) {
            state.classes = null
            state.isOverflowing = false
            state.errorMessage = null
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
    resetScheduleState,
    setClasses,
    setIsOverflowing,
    setError
} = scheduleSlice.actions

export default scheduleSlice.reducer