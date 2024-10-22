import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import generalStyles from "../../../../App.module.css";
import Modal from "react-modal";
import {setShowAuthModal, setShowLoadInfoModal} from "../../../../redux/showModalSlice";
import {LoadInfoForm} from "./loadInfoForm/LoadInfoForm";
import {AuthModalForm} from "./authForm/AuthModalForm";

export const ModalContainer = () => {

    const showLoadInfoModal = useSelector((state: RootState) => state.showModal.showLoadInfoModal)
    const showAuthModal = useSelector((state: RootState) => state.showModal.showAuthModal)

    const dispatch = useDispatch<AppDispatch>();

    return (showAuthModal || showLoadInfoModal) ?
        <Modal className={generalStyles.content}
               isOpen={showAuthModal || showLoadInfoModal}
               onRequestClose={() => {
                   dispatch(setShowLoadInfoModal(false))
                   dispatch(setShowAuthModal(false))
               }}
               contentLabel="Модальное окно приложения"
               overlayClassName={generalStyles.dialogContent}
        >
            {
                showLoadInfoModal ?
                    <LoadInfoForm showAuthModal={showAuthModal}/> :
                    <AuthModalForm/>
            }
        </Modal> : null
}