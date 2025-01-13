import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoadInfo} from "../api/schedule-backend-api";

type ModalState = {
    showLoadInfoModal: boolean
    showAuthModal: boolean
    showDeleteModal: boolean
    isLoading: boolean
    errorMessage: string | null
    loadInfo: LoadInfo | null
    formFieldsErrors: {[key: string]: string} | null
    navigateTo: string | null
    operableIds: number[]
}

const initialState: ModalState = {
    showLoadInfoModal: false,
    showAuthModal: false,
    showDeleteModal: false,
    isLoading: false,
    errorMessage: null,
    loadInfo: null,
    formFieldsErrors: null,
    navigateTo: null,
    operableIds: []
}

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        createLoadInfoInit(state: ModalState, _action: PayloadAction<{ loadInfo: LoadInfo }>) {
            state.isLoading = true
            state.showLoadInfoModal = false
        },
        editLoadInfoInit(state: ModalState, action: PayloadAction<{ loadInfo: LoadInfo }>) {
            state.operableIds.push(action.payload.loadInfo.id as number)
            state.showLoadInfoModal = false
        },
        deleteLoadInfoInit(state: ModalState, _action: PayloadAction<number>) {
            state.showDeleteModal = true
        },
        tryDeleteLoadInfo(state: ModalState) {
            state.showDeleteModal = false
        },
        abortDeleteLoadInfo(state: ModalState) {
            state.showDeleteModal = false
        },
        setAuth(state: ModalState) {
            state.showAuthModal = false
        },
        cancelAuth(state: ModalState) {
            state.showAuthModal = false
        },
        crudLoadInfoCompleted(state: ModalState) {
            state.showAuthModal = false
            state.showLoadInfoModal = false
            state.errorMessage = null
            state.loadInfo = null
            state.isLoading = false
            state.formFieldsErrors = null
        },
        setShowLoadInfoModal(state: ModalState, action: PayloadAction<boolean>) {
            state.showLoadInfoModal = action.payload
        },
        setShowAuthModal(state: ModalState, action: PayloadAction<boolean>) {
            state.showAuthModal = action.payload
            state.isLoading = false
        },
        setIsLoading(state: ModalState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setErrorMessage(state: ModalState, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload
            state.isLoading = false
        },
        setFormFieldsErrors(state: ModalState, action: PayloadAction<{[key: string]: string} | null>) {
            state.formFieldsErrors = action.payload
        },
        setNavigateTo(state: ModalState, action: PayloadAction<string | null>) {
            state.navigateTo = action.payload
        },
        setLoadInfo(state: ModalState, action: PayloadAction<LoadInfo | null>) {
            state.loadInfo = action.payload
        },
        addOperableId(state: ModalState, action: PayloadAction<number>) {
            state.operableIds.push(action.payload)
        },
        removeOperableId(state: ModalState, action: PayloadAction<number>) {
            state.operableIds = state.operableIds.filter(id => id !== action.payload)
        }
    }
})

export const {
    setShowLoadInfoModal,
    setShowAuthModal,
    setIsLoading,
    setErrorMessage,
    createLoadInfoInit,
    editLoadInfoInit,
    deleteLoadInfoInit,
    setAuth,
    crudLoadInfoCompleted,
    setFormFieldsErrors,
    cancelAuth,
    setNavigateTo,
    setLoadInfo,
    removeOperableId,
    tryDeleteLoadInfo,
    abortDeleteLoadInfo,
    addOperableId
} = modalSlice.actions

export default modalSlice.reducer