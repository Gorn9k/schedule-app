import React, {FC} from "react";
import generalStyles from "../../../../../../App.module.css";
import {ErrorMessage, Field, Form, FormikErrors, FormikTouched} from "formik";

type AuthModalFormProps = {
    errors: FormikErrors<{ login: string, password: string }>
    touched: FormikTouched<{ login: string, password: string }>
    isSubmitting: boolean
}

export const AuthForm: FC<AuthModalFormProps> = ({isSubmitting, errors, touched}) => {
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
        <ErrorMessage name='incorrectLoginOrPasswordError' component='div'
                      className={generalStyles.errorMessage}/>
        <button
            className={`${generalStyles.button} ${generalStyles.formButton}`}
            type='submit'
            disabled={isSubmitting}>Ок
        </button>
    </Form>
}