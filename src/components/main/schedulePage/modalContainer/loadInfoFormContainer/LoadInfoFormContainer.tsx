import React, {FC} from "react";
import * as Yup from "yup";
import {LoadInfoForm} from "./loadInfoForm/LoadInfoForm";
import {Formik} from "formik";
import {Schedule219} from "../../../../../api/schedule-backend-api";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";
import generalStyles from "../../../../../App.module.css";
import {createLoadInfo, updateLoadInfo} from "../../../../../redux/modalSlice";

type LoadInfoFormContainerProps = {
    errorMessage: string | null
    isLoading: boolean
    showAuthModal: boolean
    loadInfo: Schedule219 | null
}

export const LoadInfoFormContainer: FC<LoadInfoFormContainerProps> = ({
                                                                          loadInfo,
                                                                          isLoading,
                                                                          errorMessage,
                                                                          showAuthModal
                                                                      }) => {
    console.log('loadInfo')
    const dispatch = useDispatch<AppDispatch>()

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
        onSubmit={(values, {setSubmitting}) => {
            if (loadInfo?.id)
                dispatch(updateLoadInfo({loadInfo: values}));
            else
                dispatch(createLoadInfo({loadInfo: values}));
        }}
    >
        {
            !errorMessage && !isLoading && !showAuthModal && (({isSubmitting, errors, touched}) => {
                return <>
                    <h2>{`${(loadInfo?.id && 'Текущая') || 'Новая'} нагрузка`}</h2>
                    <LoadInfoForm renderButton={(disabled: boolean) =>
                        <button type="submit" disabled={disabled}
                                className={`${generalStyles.button} ${generalStyles.formButton}`}>
                            {(loadInfo?.id && 'Сохранить изменения') || 'Создать'}
                        </button>
                    } errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                </>
            })
        }
    </Formik>
}