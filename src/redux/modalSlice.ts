import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Schedule219} from "../api/schedule-backend-api";

type ModalState = {
    showLoadInfoModal: boolean
    showAuthModal: boolean
    isLoading: boolean
    errorMessage: string | null
    loadInfo: Schedule219 | null
}

const initialState: ModalState = {
    showLoadInfoModal: false,
    showAuthModal: false,
    isLoading: false,
    errorMessage: null,
    loadInfo: null
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setShowLoadInfoModal(state: ModalState, action: PayloadAction<boolean>) {
            state.showLoadInfoModal = action.payload
        },
        setShowAuthModal(state: ModalState, action: PayloadAction<boolean>) {
            state.showAuthModal = action.payload
        },
        setIsLoading(state: ModalState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setErrorMessage(state: ModalState, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload
        },
        setLoadInfo(state: ModalState, action: PayloadAction<Schedule219 | null>) {
            state.loadInfo = action.payload
        }
    }
})

export const {
    setShowLoadInfoModal,
    setShowAuthModal,
    setIsLoading,
    setErrorMessage,
    setLoadInfo
} = modalSlice.actions

export default modalSlice.reducer