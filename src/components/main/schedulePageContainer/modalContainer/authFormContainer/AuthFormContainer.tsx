import React, {FC} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {b64EncodeUnicode, Schedule219} from "../../../../../api/schedule-backend-api";
import Preloader from "../../../../preloader/Preloader";
import {AuthForm} from "./authForm/AuthForm";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";

type AuthFormContainerProps = {
    onSubmit: (values: Schedule219,
               setSubmitting: (isSubmitting: boolean) => void,
               authToken: string | null,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
    errorMessage: string | null
    loadInfo: Schedule219
}

export const AuthFormContainer: FC<AuthFormContainerProps> = ({loadInfo, onSubmit, errorMessage}) => {

    const isLoading = useSelector((state: RootState) => state.modal.isLoading)

    return <Formik
        initialValues={{login: '', password: '', incorrectValues: ''}}
        validationSchema={Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым'),
            password: Yup.string()
                .required('Поле не может быть пустым'),
        })}
        onSubmit={(values, {setSubmitting, setFieldError}) => {
            onSubmit(loadInfo, setSubmitting, b64EncodeUnicode(`${values.login}:${values.password}`), setFieldError)
        }}
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
            ||
            (
                ({isSubmitting, errors, touched}) => {
                    return <>
                        <h2>Авторизация</h2>
                        <AuthForm errors={errors} touched={touched} isSubmitting={isSubmitting}/>
                    </>
                }
            )
        }
    </Formik>
}