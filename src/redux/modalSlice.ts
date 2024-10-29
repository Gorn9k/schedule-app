import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoadInfo} from "../api/schedule-backend-api";

type ModalState = {
    showLoadInfoModal: boolean
    showAuthModal: boolean
    isLoading: boolean
    errorMessage: string | null
    loadInfo: LoadInfo | null
    formFieldsErrors: { field: string, errorMessage: string }[]
    navigateTo: string | null
    operableIds: number[]
}

const initialState: ModalState = {
    showLoadInfoModal: false,
    showAuthModal: false,
    isLoading: false,
    errorMessage: null,
    loadInfo: null,
    formFieldsErrors: [],
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
            //state.isLoading = true
            state.operableIds.push(action.payload.loadInfo.id as number)
            state.showLoadInfoModal = false
        },
        deleteLoadInfoInit(state: ModalState, action: PayloadAction<number>) {
            //state.isLoading = true
            state.operableIds.push(action.payload)
        },
        setAuth(state: ModalState) {
            state.showAuthModal = false
        },
        cancelAuth(state: ModalState) {
            state.showAuthModal = false
        },
        crudLoadInfoSuccess(state: ModalState) {
            state.showLoadInfoModal = false
            state.showAuthModal = false
            state.loadInfo = null
            state.isLoading = false
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
            if (action.payload)
                state.showLoadInfoModal = true
            state.isLoading = false
        },
        setFormFieldsErrors(state: ModalState, action: PayloadAction<{ field: string, errorMessage: string }>) {
            state.formFieldsErrors.push(action.payload)
            state.isLoading = false
        },
        setNavigateTo(state: ModalState, action: PayloadAction<string | null>) {
            state.navigateTo = action.payload
        },
        setLoadInfo(state: ModalState, action: PayloadAction<LoadInfo | null>) {
            state.loadInfo = action.payload
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
    crudLoadInfoSuccess,
    setFormFieldsErrors,
    cancelAuth,
    setNavigateTo,
    setLoadInfo,
    removeOperableId
} = modalSlice.actions

export default modalSlice.reducer