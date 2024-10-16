import React, {FC} from "react";
import generalStyles from "../../../../App.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Modal from "react-modal";

type AuthModalFormProps = {
    formLoginError: boolean
    showModal: boolean
    setFormLoginError: (flag: boolean) => void
    setShowModal: (flag: boolean) => void
    onSubmit: (values: { login: string, password: string }, setSubmitting: (isSubmitting: boolean) => void,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
}

export const AuthModalForm: FC<AuthModalFormProps> = ({
                                                          formLoginError,
                                                          onSubmit,
                                                          showModal,
                                                          setShowModal,
                                                          setFormLoginError
                                                      }) => {
    return (
        <Modal className={generalStyles.content}
               isOpen={showModal}
               onRequestClose={() => {
                   setFormLoginError(false)
                   setShowModal(false)
               }}
               contentLabel="Ошибка 403"
               overlayClassName={generalStyles.dialogContent}
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
                        {formLoginError &&
                            <p className={generalStyles.labelError}>Неверно введены
                                логин или пароль.</p>}
                        <div className={generalStyles.formLoginButtonsBlock}>
                            <button
                                className={`${generalStyles.button} ${generalStyles.formButton}`}
                                type='submit'
                                disabled={isSubmitting}>Ок
                            </button>
                            <button
                                className={`${generalStyles.button} ${generalStyles.formButton}`}
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