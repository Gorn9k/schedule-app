import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import generalStyles from "../../../../App.module.css";
import Modal from "react-modal";
import {
    abortDeleteLoadInfo,
    cancelAuth, crudLoadInfoCompleted,
    setErrorMessage, setFormFieldsErrors,
    setIsLoading,
    setLoadInfo,
    setNavigateTo,
    setShowLoadInfoModal, tryDeleteLoadInfo
} from "../../../../redux/modalSlice";
import {LoadInfoFormContainer} from "./loadInfoFormContainer/LoadInfoFormContainer";
import {AuthFormContainer} from "./authFormContainer/AuthFormContainer";
import React, {useEffect} from "react";
import Preloader from "../../../preloader/Preloader";
import {useNavigate} from "react-router-dom";
import styles from './ModalContainer.module.css'

export const ModalContainer = () => {

    const showLoadInfoModal = useSelector((state: RootState) => state.modal.showLoadInfoModal)
    const showAuthModal = useSelector((state: RootState) => state.modal.showAuthModal)
    const showDeleteModal = useSelector((state: RootState) => state.modal.showDeleteModal)
    const errorMessage = useSelector((state: RootState) => state.modal.errorMessage)
    const isLoading = useSelector((state: RootState) => state.modal.isLoading)

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const navigateTo = useSelector((state: RootState) => state.modal.navigateTo)

    useEffect(() => {
        if (navigateTo) {
            navigate(navigateTo)
            dispatch(setNavigateTo(null))
        }
    }, [dispatch, navigate, navigateTo]);

    return (showAuthModal || showLoadInfoModal || errorMessage || isLoading || showDeleteModal) ?
        <Modal className={generalStyles.content}
               isOpen={showAuthModal || showLoadInfoModal || !!errorMessage || isLoading || showDeleteModal}
               onRequestClose={() => {
                   dispatch(crudLoadInfoCompleted())
                   dispatch(abortDeleteLoadInfo())
                   dispatch(cancelAuth())
               }}
               contentLabel="Модальное окно приложения"
               overlayClassName={generalStyles.dialogContent}
        >
            {
                (isLoading && <Preloader/>)
                ||
                (errorMessage &&
                    <h2 style={{
                        color: 'red',
                        textAlign: 'center',
                        alignContent: 'center',
                        margin: '0'
                    }}>{errorMessage}</h2>)
                    ||
                (showAuthModal && <AuthFormContainer/>)
                ||
                (showLoadInfoModal && <LoadInfoFormContainer/>)
                ||
                (showDeleteModal && <h2>Вы уверены что хотите удалить эту нагрузку?</h2>)
            }
            {
                (showDeleteModal && <div className={styles.deleteModalButtons}>
                    <button className={`${generalStyles.button} ${generalStyles.formButton}`}
                            onClick={() => dispatch(tryDeleteLoadInfo())}>
                        Да
                    </button>
                    <button className={`${generalStyles.button} ${generalStyles.formButton}`}
                            onClick={() => dispatch(abortDeleteLoadInfo())}>
                        Нет
                    </button>
                </div>) ||
                <button className={`${generalStyles.button} ${generalStyles.formButton}`}
                        onClick={() => {
                            if (errorMessage)
                                dispatch(setErrorMessage(null))
                            else if (isLoading)
                                dispatch(setIsLoading(false))
                            else if (showAuthModal)
                                dispatch(cancelAuth())
                            else if (showLoadInfoModal) {
                                dispatch(setShowLoadInfoModal(false))
                                dispatch(setLoadInfo(null))
                                dispatch(setFormFieldsErrors(null))
                            }
                        }}>Закрыть
                </button>
            }
        </Modal> : null
}