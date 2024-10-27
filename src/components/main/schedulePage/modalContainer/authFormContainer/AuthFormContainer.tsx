import React, {FC} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {b64EncodeUnicode} from "../../../../../api/schedule-backend-api";
import {AuthForm} from "./authForm/AuthForm";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";
import {setAuth} from "../../../../../redux/loadInfoSlice";

type AuthFormContainerProps = {
    errorMessage: string | null
    isLoading: boolean
}

export const AuthFormContainer: FC<AuthFormContainerProps> = ({errorMessage, isLoading}) => {
    console.log('auth')
    const dispatch = useDispatch<AppDispatch>()

    return <Formik
        initialValues={{login: '', password: '', incorrectValues: ''}}
        validationSchema={Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым'),
            password: Yup.string()
                .required('Поле не может быть пустым'),
        })}
        onSubmit={(values, {setSubmitting}) => {
            localStorage.setItem('authToken', b64EncodeUnicode(`${values.login}:${values.password}`))
            dispatch(setAuth())
            setSubmitting(false)
        }}
    >
        {
            !errorMessage && !isLoading && (({isSubmitting, errors, touched, setFieldError}) => {
                return <>
                    <h2>Авторизация</h2>
                    <AuthForm errors={errors} setFieldError={setFieldError} touched={touched}
                              isSubmitting={isSubmitting}/>
                </>
            })
        }
    </Formik>
}