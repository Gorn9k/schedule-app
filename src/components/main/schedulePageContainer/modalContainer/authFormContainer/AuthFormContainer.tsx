import React, {FC} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {b64EncodeUnicode, Schedule219} from "../../../../../api/schedule-backend-api";
import Preloader from "../../../../preloader/Preloader";
import {AuthForm} from "./authForm/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../../redux/store";
import {setAuth} from "../../../../../redux/modalSlice";

type AuthFormContainerProps = {
    errorMessage: string | null
    loadInfo: Schedule219
}

export const AuthFormContainer: FC<AuthFormContainerProps> = ({loadInfo, errorMessage}) => {

    const isLoading = useSelector((state: RootState) => state.modal.isLoading)

    const dispatch = useDispatch<AppDispatch>()

    return <Formik
        initialValues={{login: '', password: '', incorrectValues: ''}}
        validationSchema={Yup.object({
            login: Yup.string()
                .required('Поле не может быть пустым'),
            password: Yup.string()
                .required('Поле не может быть пустым'),
        })}
        onSubmit={(values) => {
            localStorage.setItem('authToken', b64EncodeUnicode(`${values.login}:${values.password}`))
            dispatch(setAuth())
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