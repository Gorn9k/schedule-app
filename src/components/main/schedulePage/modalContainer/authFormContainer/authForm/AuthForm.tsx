import React, {FC, useEffect} from "react";
import generalStyles from "../../../../../../App.module.css";
import {ErrorMessage, Field, Form, FormikErrors, FormikTouched} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

type AuthModalFormProps = {
    errors: FormikErrors<{login: string, password: string}>
    touched: FormikTouched<{login: string, password: string}>
    setFieldError: (field: string, message: (string | undefined)) => void
    isSubmitting: boolean
}

export const AuthForm: FC<AuthModalFormProps> = ({isSubmitting, errors, setFieldError, touched}) => {

    const formFieldsErrors = useSelector((state: RootState) => state.modal.formFieldsErrors)

    useEffect(() => {
        formFieldsErrors && formFieldsErrors.forEach(element =>
            setFieldError(element.field, element.errorMessage))
    }, [formFieldsErrors]);

    return <Form>
        <div>
            <label htmlFor='login'>Логин:</label>
            <Field name='login' type='text' id='login'
                   className={errors.login && touched.login ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name='login' component='div'
                      className={generalStyles.errorMessage}/>
        <div>
            <label htmlFor='password'>Пароль:</label>
            <Field name='password' type='password' id='password'
                   className={errors.password && touched.password ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name='password' component='div'
                      className={generalStyles.errorMessage}/>
        <ErrorMessage name='incorrectValues' component='div'
                      className={generalStyles.errorMessage}/>
        <button
            className={`${generalStyles.button} ${generalStyles.formButton}`}
            type='submit'
            disabled={isSubmitting}>Ок
        </button>
    </Form>
}