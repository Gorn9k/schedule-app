import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import generalStyles from "../../../../App.module.css";
import Modal from "react-modal";
import {
    setErrorMessage, setIsLoading, setLoadInfo,
    setShowAuthModal,
    setShowLoadInfoModal
} from "../../../../redux/modalSlice";
import {LoadInfoFormContainer} from "./loadInfoFormContainer/LoadInfoFormContainer";
import {AuthFormContainer} from "./authFormContainer/AuthFormContainer";
import React, {useCallback} from "react";
import {createSchedule219, editSchedule219, Schedule219} from "../../../../api/schedule-backend-api";
import {useNavigate} from "react-router-dom";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../../../../utils/dates";

export const ModalContainer = () => {

    const showLoadInfoModal = useSelector((state: RootState) => state.modal.showLoadInfoModal)
    const showAuthModal = useSelector((state: RootState) => state.modal.showAuthModal)
    const errorMessage = useSelector((state: RootState) => state.modal.errorMessage)
    const loadInfo = useSelector((state: RootState) => state.modal.loadInfo)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const onSubmit = useCallback((values: Schedule219,
                                  setSubmitting: (isSubmitting: boolean) => void,
                                  authToken: string | null,
                                  setFieldError: (field: string, message: (string | undefined)) => void) => {
        dispatch(setIsLoading(true));
        ((loadInfo?.id && editSchedule219) || createSchedule219)(values, authToken)
            .then(() => {
                dispatch(setShowLoadInfoModal(false))
                dispatch(setShowAuthModal(false))
                dispatch(setLoadInfo(null))
                !localStorage.getItem('authToken') && localStorage.setItem('authToken', authToken as string)
                const startDate = new Date(generateStartDateMilliseconds(new Date(values.date))).toLocaleDateString('en-CA')
                const endDate = new Date(generateEndDateMilliseconds(new Date(values.date))).toLocaleDateString('en-CA')
                navigate(`/loads-info?startDate=${startDate}&endDate=${endDate}`)
            })
            .catch((reason) => {
                dispatch(setLoadInfo(values))
                if (reason.response && reason.response.status === 403) {
                    showAuthModal && setFieldError('incorrectValues', 'Неверно введены логин или пароль')
                    dispatch(setShowAuthModal(true))
                    localStorage.getItem('authToken') && localStorage.removeItem('authToken')
                } else if (reason.response && reason.response.status === 400) {
                    for (const [field, message] of Object.entries(reason.response.data as {
                        [key: string]: string
                    })) {
                        setFieldError(field, message)
                    }
                } else
                    dispatch(setErrorMessage(`Не удалось ${(loadInfo?.id && 'изменить') || 'сохранить'} нагрузку.`))
            })
            .finally(() => {
                dispatch(setIsLoading(false))
                setSubmitting(false)
            })
    }, [dispatch, loadInfo, navigate, showAuthModal])

    return (showAuthModal || showLoadInfoModal) ?
        <Modal className={generalStyles.content}
               isOpen={showAuthModal || showLoadInfoModal}
               onRequestClose={() => {
                   dispatch(setShowLoadInfoModal(false))
                   dispatch(setShowAuthModal(false))
                   dispatch(setLoadInfo(null))
                   dispatch(setErrorMessage(null))
               }}
               contentLabel="Модальное окно приложения"
               overlayClassName={generalStyles.dialogContent}
        >
            {showLoadInfoModal &&
                <LoadInfoFormContainer loadInfo={loadInfo}
                                       showAuthModal={showAuthModal}
                                       errorMessage={errorMessage}
                                       onSubmit={onSubmit}/>}
            {showAuthModal && <AuthFormContainer loadInfo={loadInfo as Schedule219} errorMessage={errorMessage} onSubmit={onSubmit}/>}
            <button className={`${generalStyles.button} ${generalStyles.formButton}`}
                    onClick={() => {
                        if (errorMessage)
                            dispatch(setErrorMessage(null))
                        else if (showAuthModal)
                            dispatch(setShowAuthModal(false))
                        else {
                            dispatch(setShowLoadInfoModal(false))
                            dispatch(setLoadInfo(null))
                        }
                    }}>Закрыть
            </button>
        </Modal> : null
}