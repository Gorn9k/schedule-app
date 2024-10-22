import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import generalStyles from "../../../../App.module.css";
import Modal from "react-modal";
import {setShowAuthModal, setShowLoadInfoModal} from "../../../../redux/showModalSlice";
import {LoadInfoFormContainer} from "./loadInfoFormContainer/LoadInfoFormContainer";
import {AuthFormContainer} from "./authFormContainer/AuthFormContainer";
import React, {useCallback, useState} from "react";
import {createSchedule219, editSchedule219, Schedule219} from "../../../../api/schedule-backend-api";
import {NavigateFunction} from "react-router-dom";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../../../../utils/dates";

export const ModalContainer = () => {

    const showLoadInfoModal = useSelector((state: RootState) => state.showModal.showLoadInfoModal)
    const showAuthModal = useSelector((state: RootState) => state.showModal.showAuthModal)

    const dispatch = useDispatch<AppDispatch>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = useCallback((loadInfoId: number | undefined,
                                  values: Schedule219,
                                  setSubmitting: (isSubmitting: boolean) => void,
                                  authToken: string | null,
                                  setFieldError: (field: string, message: (string | undefined)) => void,
                                  setErrorMessage: (message: string | null) => void,
                                  setLoading: (flag: boolean) => void,
                                  navigate: NavigateFunction) => {
        setLoading(true);
        ((loadInfoId && editSchedule219) || createSchedule219)(values, authToken)
            .then(() => {
                dispatch(setShowLoadInfoModal(false))
                dispatch(setShowAuthModal(false))
                !localStorage.getItem('authToken') && localStorage.setItem('authToken', authToken as string)
                const startDate = new Date(generateStartDateMilliseconds(new Date(values.date)))
                const endDate = new Date(generateEndDateMilliseconds(new Date(values.date)))
                navigate(`/loads-info?startDate=${startDate}&endDate=${endDate}}`)
            })
            .catch((reason) => {
                if (reason.response && reason.response.status === 403) {
                    dispatch(setShowAuthModal(true))
                    localStorage.getItem('authToken') && localStorage.removeItem('authToken')
                } else if (reason.response && reason.response.status === 400) {
                    for (const [field, message] of Object.entries(reason.response.data as {
                        [key: string]: string
                    })) {
                        setFieldError(field, message)
                    }
                } else
                    setErrorMessage(`Не удалось ${(loadInfoId && 'изменить') || 'сохранить'} нагрузку.`)
            })
            .finally(() => {
                setLoading(false)
                setSubmitting(false)
            })
    }, [])

    return (showAuthModal || showLoadInfoModal) ?
        <Modal className={generalStyles.content}
               isOpen={showAuthModal || showLoadInfoModal}
               onRequestClose={() => {
                   dispatch(setShowLoadInfoModal(false))
                   dispatch(setShowAuthModal(false))
                   setErrorMessage(null)
               }}
               contentLabel="Модальное окно приложения"
               overlayClassName={generalStyles.dialogContent}
        >
            {showLoadInfoModal && <LoadInfoFormContainer showAuthModal={showAuthModal}
                                                         errorMessage={errorMessage}
                                                         setErrorMessage={setErrorMessage}
                                                         onSubmit={onSubmit}/>}
            {showAuthModal && <AuthFormContainer/>}
            <button className={`${generalStyles.button} ${generalStyles.formButton}`}
                    onClick={() => {
                        if (errorMessage)
                            setErrorMessage(null)
                        else if (showAuthModal)
                            dispatch(setShowAuthModal(false))
                        else
                            dispatch(setShowLoadInfoModal(false))
                    }}>Закрыть
            </button>
        </Modal> : null
}