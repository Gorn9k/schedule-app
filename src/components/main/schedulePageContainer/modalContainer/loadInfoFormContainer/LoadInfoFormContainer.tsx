import React, {FC} from "react";
import * as Yup from "yup";
import {LoadInfoForm} from "./loadInfoForm/LoadInfoForm";
import {Formik} from "formik";
import {Schedule219} from "../../../../../api/schedule-backend-api";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import Preloader from "../../../../preloader/Preloader";
import generalStyles from "../../../../../App.module.css";

type LoadInfoFormContainerProps = {
    onSubmit: (values: Schedule219,
               setSubmitting: (isSubmitting: boolean) => void,
               authToken: string | null,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
    errorMessage: string | null
    showAuthModal: boolean
    loadInfo: Schedule219 | null
}

export const LoadInfoFormContainer: FC<LoadInfoFormContainerProps> = ({
                                                                          loadInfo,
                                                                          onSubmit,
                                                                          errorMessage,
                                                                          showAuthModal
                                                                      }) => {

    const isLoading = useSelector((state: RootState) => state.modal.isLoading)

    return <Formik
        initialValues={{
            id: loadInfo?.id,
            date: loadInfo?.date || '',
            time: loadInfo?.time || '',
            type: loadInfo?.type || '',
            responsible: loadInfo?.responsible || '',
            description: loadInfo?.description || ''
        }}
        validationSchema={Yup.object({
            date: Yup.string()
                .required('Поле не может быть пустым'),
            time: Yup.string()
                .required('Поле не может быть пустым'),
            type: Yup.string()
                .max(60, 'Максимальное кол-во символов должно быть равно 60')
                .required('Поле не может быть пустым'),
            responsible: Yup.string()
                .max(40, 'Максимальное кол-во символов должно быть равно 40')
                .required('Поле не может быть пустым'),
            description: Yup.string()
                .max(1000, 'Максимальное кол-во символов должно быть равно 1000')
                .required('Поле не может быть пустым')
        })}
        onSubmit={(values, {setSubmitting, setFieldError}) => {
            onSubmit(values, setSubmitting, localStorage.getItem('authToken'), setFieldError)
        }}
    >
        {
            !showAuthModal && ((isLoading && <Preloader/>)
                ||
                (errorMessage &&
                    <h2 style={{
                        color: 'red',
                        textAlign: 'center',
                        alignContent: 'center',
                        margin: '0'
                    }}>{errorMessage}</h2>
                )
                ||
                (({isSubmitting, errors, touched}) => {
                    return <>
                        <h2>{`${(loadInfo?.id && 'Текущая') || 'Новая'} нагрузка`}</h2>
                        <LoadInfoForm renderButton={(disabled: boolean) =>
                            <button type="submit" disabled={disabled}
                                    className={`${generalStyles.button} ${generalStyles.formButton}`}>
                                {(loadInfo?.id && 'Сохранить изменения') || 'Создать'}
                            </button>
                        } errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                    </>
                }))
        }
    </Formik>
}