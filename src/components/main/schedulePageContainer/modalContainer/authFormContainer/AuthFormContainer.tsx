import React, {FC, useState} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {b64EncodeUnicode, Schedule219} from "../../../../../api/schedule-backend-api";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Preloader from "../../../../preloader/Preloader";
import {AuthForm} from "./authForm/AuthForm";

type AuthFormContainerProps = {
    onSubmit: (loadInfoId: (number | undefined),
               values: Schedule219,
               setSubmitting: (isSubmitting: boolean) => void,
               authToken: string | null,
               setFieldError: (field: string, message: (string | undefined)) => void,
               setLoading: (flag: boolean) => void,
               navigate: NavigateFunction) => void
    errorMessage: string | null
    schedule: Schedule219
}

export const AuthFormContainer: FC<AuthFormContainerProps> = ({schedule, onSubmit, errorMessage}) => {

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    return <Formik
        initialValues={{login: '', password: ''}}
        validationSchema={Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым'),
            password: Yup.string()
                .required('Поле не может быть пустым'),
        })}
        onSubmit={(values, {setSubmitting, setFieldError}) => {
            onSubmit(undefined, schedule, setSubmitting, b64EncodeUnicode(`${values.login}:${values.password}`), setFieldError, setLoading, navigate)
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