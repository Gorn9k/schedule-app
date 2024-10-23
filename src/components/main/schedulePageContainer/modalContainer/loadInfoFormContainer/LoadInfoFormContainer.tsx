import React, {FC, useCallback, useEffect, useState} from "react";
import * as Yup from "yup";
import {LoadInfoForm} from "./loadInfoForm/LoadInfoForm";
import {Formik} from "formik";
import {getSchedule219LoadInfoById, Schedule219} from "../../../../../api/schedule-backend-api";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Preloader from "../../../../preloader/Preloader";
import generalStyles from "../../../../../App.module.css";

type LoadInfoFormContainerProps = {
    onSubmit: (loadInfoId: (number | undefined),
               values: Schedule219,
               setSubmitting: (isSubmitting: boolean) => void,
               authToken: string | null,
               setFieldError: (field: string, message: (string | undefined)) => void,
               setLoading: (flag: boolean) => void,
               navigate: NavigateFunction) => void
    errorMessage: string | null
    setErrorMessage: (message: string | null) => void
    showAuthModal: boolean
    schedule: Schedule219 | null
    setSchedule: (schedule: Schedule219 | null) => void
}

export const LoadInfoFormContainer: FC<LoadInfoFormContainerProps> = ({
                                                                          onSubmit,
                                                                          errorMessage,
                                                                          setErrorMessage,
                                                                          showAuthModal,
                                                                          schedule,
                                                                          setSchedule
                                                                      }) => {

    const id = useSelector((state: RootState) => state.showModal.loadInfoId)
    const [loading, setLoading] = useState<boolean>(!!id)

    const navigate = useNavigate();

    const fetchLoadInfoById = useCallback((id: number) => {
        setLoading(true);
        getSchedule219LoadInfoById(`${id}`)
            .then((data) => {
                setErrorMessage(null)
                setSchedule(data);
            })
            .catch(() => setErrorMessage('Не удалось получить нагрузку на 219 аудиторию.'))
            .finally(() => setLoading(false))

    }, [setErrorMessage, setSchedule])

    useEffect(() => {
        id && fetchLoadInfoById(id)
    }, [fetchLoadInfoById, id])

    return (id && loading
        && <Preloader/>
    ) || <Formik
        initialValues={{
            id: schedule?.id,
            date: schedule?.date || '',
            time: schedule?.time || '',
            type: schedule?.type || '',
            responsible: schedule?.responsible || '',
            description: schedule?.description || ''
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
            onSubmit(id, values, setSubmitting, localStorage.getItem('authToken'), setFieldError, setLoading, navigate)
        }}
    >
        {
            (loading && <Preloader/>)
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
            (
                !showAuthModal && (({isSubmitting, errors, touched}) => {
                    return <>
                        <h2>{`${(id && 'Текущая') || 'Новая'} нагрузка`}</h2>
                        <LoadInfoForm renderButton={(disabled: boolean) =>
                            <button type="submit" disabled={disabled}
                                    className={`${generalStyles.button} ${generalStyles.formButton}`}>
                                {(id && 'Сохранить изменения') || 'Создать'}
                            </button>
                        } errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                    </>
                })
            )
        }
    </Formik>
}