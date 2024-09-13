import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type ConnectionErrorMessageState = {
    error: string | null
}

const initialState: ConnectionErrorMessageState = {
    error: null
}

const connectionErrorMessageSlice = createSlice({
    name: "connectionErrorMessage",
    initialState,
    reducers: {
        setError(state: ConnectionErrorMessageState, action: PayloadAction<ConnectionErrorMessageState>) {
            state.error = action.payload.error
        }
    }
})

export const {
    setError
} = connectionErrorMessageSlice.actions

export default connectionErrorMessageSlice.reducer