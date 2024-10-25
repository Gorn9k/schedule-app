import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Schedule219} from "../api/schedule-backend-api";
import {number} from "yup";
import { NavigateFunction } from 'react-router-dom';

type ModalState = {
    showLoadInfoModal: boolean
    showAuthModal: boolean
    isLoading: boolean
    errorMessage: string | null
    loadInfo: Schedule219 | null
    formFieldsErrors: {field: string, errorMessage: string}[] | null
}

const initialState: ModalState = {
    showLoadInfoModal: false,
    showAuthModal: false,
    isLoading: false,
    errorMessage: null,
    loadInfo: null,
    formFieldsErrors: null
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        createLoadInfo(state: ModalState, action: PayloadAction<{loadInfo: Schedule219}>) {
            state.isLoading = true
        },
        updateLoadInfo(state: ModalState, action: PayloadAction<{loadInfo: Schedule219}>) {
            state.isLoading = true
        },
        deleteLoadInfo(state: ModalState, action: PayloadAction<number>) {
            state.isLoading = true
        },
        setAuth() {},
        cancelAuth() {

        },
        createLoadInfoSuccess(state: ModalState) {
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
        setFormFieldsErrors(state: ModalState, action: PayloadAction<{field: string, errorMessage: string}>) {
            state.formFieldsErrors?.push(action.payload)
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
    createLoadInfoSuccess,
    setFormFieldsErrors,
    cancelAuth
} = modalSlice.actions

export default modalSlice.reducer