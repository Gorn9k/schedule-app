import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type OverflowTableBodyState = {
    isOverflowing: boolean
}

const initialState: OverflowTableBodyState = {
    isOverflowing: false
}

const overflowTableBodySlice = createSlice({
    name: "overflowTableBody",
    initialState,
    reducers: {
        setOverflowing(state: OverflowTableBodyState, action: PayloadAction<OverflowTableBodyState>) {
            state.isOverflowing = action.payload.isOverflowing
        }
    }
})

export const {
    setOverflowing
} = overflowTableBodySlice.actions

export default overflowTableBodySlice.reducer