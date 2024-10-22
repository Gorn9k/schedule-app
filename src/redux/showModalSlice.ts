import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type FrameType = 'FIRST' | 'FOURTH' | null

type ShowModalState = {
    loadInfoId?: number
    showLoadInfoModal: boolean
    showAuthModal: boolean
}

const initialState: ShowModalState = {
    showLoadInfoModal: false,
    showAuthModal: false
}

const showModalSlice = createSlice({
    name: "showModalSlice",
    initialState,
    reducers: {
        setShowLoadInfoModal(state: ShowModalState, action: PayloadAction<boolean>) {
            state.showLoadInfoModal = action.payload
        },
        setShowAuthModal(state: ShowModalState, action: PayloadAction<boolean>) {
            state.showAuthModal = action.payload
        },
        setLoadInfoId(state: ShowModalState, action: PayloadAction<number>) {
            state.loadInfoId = action.payload
        }
    }
})

export const {
    setShowLoadInfoModal,
    setShowAuthModal,
    setLoadInfoId
} = showModalSlice.actions

export default showModalSlice.reducer