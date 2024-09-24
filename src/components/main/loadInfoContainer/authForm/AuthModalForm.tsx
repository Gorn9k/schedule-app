import React, {FC} from "react";
import stylesForInfo from "../Schedule219Info.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {b64EncodeUnicode, createSchedule219, editSchedule219} from "../../../../api/schedule-backend-api";
import styles from "../../schedule/Schedule.module.css";
import Modal from "react-modal";

type AuthModalFormProps = {

}

export const AuthModalForm: FC<AuthModalFormProps> = () => {

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
                    setLoading(true)
                    const authToken = localStorage.getItem('authToken') || b64EncodeUnicode(`${values.login}:${values.password}`);
                    (props.action === 'edit' ?
                        editSchedule219(formSchedule, authToken) :
                        createSchedule219(formSchedule, authToken))
                        .then(() => {
                            setError(null)
                            setFormLoginError(false)
                            setShowModal(false)
                            !localStorage.getItem('authToken') && localStorage.setItem('authToken', authToken)
                            navigate(-1)
                        })
                        .catch((reason) => {
                            if (reason.response.status === 403) {
                                setShowModal(true)
                                setFormLoginError(true)
                                localStorage.getItem('authToken') && localStorage.removeItem('authToken')
                            } else if (reason.response.status === 400) {
                                for (const [field, message] of Object.entries(reason.response.data as {
                                    [key: string]: string
                                })) {
                                    setFieldError(field, message)
                                }
                            } else
                                setError(props.action === "edit" ? 'Не удалось изменить нагрузку.' : 'Не удалось создать нагрузку.')
                        })
                        .finally(() => {
                            setLoading(false)
                            setSubmitting(false)
                        })
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