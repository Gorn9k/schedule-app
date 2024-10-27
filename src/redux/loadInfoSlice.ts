import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Schedule219} from "../api/schedule-backend-api";

type ModalState = {
    showLoadInfoModal: boolean
    showAuthModal: boolean
    isLoading: boolean
    errorMessage: string | null
    loadInfo: Schedule219 | null
    formFieldsErrors: { field: string, errorMessage: string }[]
    navigateTo: string | null

}

const initialState: ModalState = {
    showLoadInfoModal: false,
    showAuthModal: false,
    isLoading: false,
    errorMessage: null,
    loadInfo: null,
    formFieldsErrors: [],
    navigateTo: null
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        createLoadInfo(state: ModalState, _action: PayloadAction<{ loadInfo: Schedule219 }>) {
            state.isLoading = true
        },
        updateLoadInfo(state: ModalState, _action: PayloadAction<{ loadInfo: Schedule219 }>) {
            state.isLoading = true
        },
        deleteLoadInfo(state: ModalState, _action: PayloadAction<number>) {
            state.isLoading = true
        },
        setAuth() {
        },
        cancelAuth(state: ModalState) {
            state.showAuthModal = false
        },
        crudLoadInfoSuccess(state: ModalState) {
            state.showLoadInfoModal = false
            state.showAuthModal = false
            state.loadInfo = null
        },
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
        },
        setFormFieldsErrors(state: ModalState, action: PayloadAction<{ field: string, errorMessage: string }>) {
            state.formFieldsErrors.push(action.payload)
        },
        setNavigateTo(state: ModalState, action: PayloadAction<string | null>) {
            state.navigateTo = action.payload
        }
    }
})

export const {
    setShowLoadInfoModal,
    setShowAuthModal,
    setIsLoading,
    setErrorMessage,
    setLoadInfo,
    createLoadInfo,
    updateLoadInfo,
    deleteLoadInfo,
    setAuth,
    crudLoadInfoSuccess,
    setFormFieldsErrors,
    cancelAuth,
    setNavigateTo
} = modalSlice.actions

export default modalSlice.reducer