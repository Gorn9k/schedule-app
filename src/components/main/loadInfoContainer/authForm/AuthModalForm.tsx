import React, {FC} from "react";
import stylesForInfo from "../Schedule219Info.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from "../../scheduleContainer/ScheduleContainer.module.css";
import Modal from "react-modal";

type AuthModalFormProps = {
    formLoginError: boolean
    showModal: boolean
    setFormLoginError: (flag: boolean) => void
    setShowModal: (flag: boolean) => void
    onSubmit: (values: { login: string, password: string }, setSubmitting: (isSubmitting: boolean) => void,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
}

export const AuthModalForm: FC<AuthModalFormProps> = ({formLoginError, onSubmit, showModal, setShowModal, setFormLoginError}) => {
    console.log('Auth Modal Form');
    return (
        <Modal className={stylesForInfo.content}
               isOpen={showModal}
               onRequestClose={() => {
                   setFormLoginError(false)
                   setShowModal(false)
               }}
               contentLabel="Ошибка 403"
               overlayClassName={stylesForInfo.dialogContent}
        >
            <h2>Авторизация</h2>
            <Formik
                initialValues={{login: '', password: ''}}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .required('Поле не может быть пустым'),
                    password: Yup.string()
                        .required('Поле не может быть пустым'),
                })}
                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    onSubmit(values, setSubmitting, setFieldError)
                }}
            >
                {({isSubmitting, errors, touched}) => (
                    <Form>
                        <div>
                            <div>
                                <label htmlFor='login'>Логин:</label>
                                <Field name='login' type='text' id='login'
                                       className={errors.login && touched.login ? stylesForInfo.error : ''}/>
                                <ErrorMessage name='login' component='div'
                                              className={stylesForInfo.errorMessage}/>
                            </div>
                            <div>
                                <label htmlFor='password'>Пароль:</label>
                                <Field name='password' type='password' id='password'
                                       className={errors.password && touched.password ? stylesForInfo.error : ''}/>
                                <ErrorMessage name='password' component='div'
                                              className={stylesForInfo.errorMessage}/>
                            </div>
                            {formLoginError &&
                                <p className={stylesForInfo.labelError}>Неверно введены
                                    логин или пароль.</p>}
                        </div>
                        <div className={stylesForInfo.formLoginButtonsBlock}>
                            <button
                                className={`${styles.button} ${stylesForInfo.formButton}`}
                                type='submit'
                                disabled={isSubmitting}>Ок
                            </button>
                            <button
                                className={`${styles.button} ${stylesForInfo.formButton}`}
                                type="button"
                                onClick={() => {
                                    setFormLoginError(false)
                                    setShowModal(false)
                                }}>Закрыть
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}