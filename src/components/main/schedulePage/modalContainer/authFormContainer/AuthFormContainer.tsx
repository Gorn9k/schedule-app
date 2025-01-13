import React, {FC} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {b64EncodeUnicode} from "../../../../../api/schedule-backend-api";
import {AuthForm} from "./authForm/AuthForm";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";
import {setAuth} from "../../../../../redux/modalSlice";
import {FormFieldsErrors} from "../formFieldsErrors/FormFieldsErrors";

export const AuthFormContainer: FC = () => {

    const dispatch = useDispatch<AppDispatch>()

    return <Formik
        initialValues={{login: '', password: '', incorrectLoginOrPasswordError: ''}}
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
            (({setFieldTouched, setErrors, isSubmitting, errors, touched}) => {
                return <FormFieldsErrors setFieldTouched={setFieldTouched} setErrors={setErrors}>
                    <h2>Авторизация</h2>
                    <AuthForm errors={errors}
                              touched={touched}
                              isSubmitting={isSubmitting}/>
                </FormFieldsErrors>
            })
        }
    </Formik>
}