import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import generalStyles from "../../../../App.module.css";
import Modal from "react-modal";
import {
    cancelAuth,
    setErrorMessage,
    setIsLoading, setLoadInfo, setNavigateTo,
    setShowLoadInfoModal
} from "../../../../redux/modalSlice";
import {LoadInfoFormContainer} from "./loadInfoFormContainer/LoadInfoFormContainer";
import {AuthFormContainer} from "./authFormContainer/AuthFormContainer";
import React, {useEffect} from "react";
import Preloader from "../../../preloader/Preloader";
import {useNavigate} from "react-router-dom";

export const ModalContainer = () => {

    const showLoadInfoModal = useSelector((state: RootState) => state.modal.showLoadInfoModal)
    const showAuthModal = useSelector((state: RootState) => state.modal.showAuthModal)
    const errorMessage = useSelector((state: RootState) => state.modal.errorMessage)
    const loadInfo = useSelector((state: RootState) => state.modal.loadInfo)
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

    console.log('modal')
    return (showAuthModal || showLoadInfoModal || errorMessage || isLoading) ?
        <Modal className={generalStyles.content}
               isOpen={showAuthModal || showLoadInfoModal || !!errorMessage || isLoading}
               onRequestClose={() => {
                   dispatch(setShowLoadInfoModal(false))
                   dispatch(setLoadInfo(null))
                   dispatch(setErrorMessage(null))
                   dispatch(setIsLoading(false))
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
                    }}>{errorMessage}</h2>
                )
            }
            {showLoadInfoModal && <LoadInfoFormContainer isLoading={isLoading}
                                                         errorMessage={errorMessage}
                                                         loadInfo={loadInfo}
                                                         showAuthModal={showAuthModal}/>}
            {showAuthModal && <AuthFormContainer isLoading={isLoading}
                                                 errorMessage={errorMessage}/>}
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
                        }
                    }}>Закрыть
            </button>
        </Modal> : null
}