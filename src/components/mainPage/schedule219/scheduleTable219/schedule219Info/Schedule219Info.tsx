import React, {FC, useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import styles from "../../Schedule219.module.css";
import stylesForInfo from './Schedule219Info.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {
    b64EncodeUnicode, createSchedule219, deleteSchedule219,
    editSchedule219,
    getSchedule219LoadInfoById,
    Schedule219,
    Schedule219Payload
} from '../../../../../api/schedule-backend-api';
import Preloader from "../../../../preloader/Preloader";
import Modal from 'react-modal';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {generateQueryWeekPeriod} from "../../../MainPage";

type Schedule219InfoProps = {
    action: 'create' | 'edit'
}

const Schedule219Info: FC<Schedule219InfoProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule219 | null>(null);
    const [formSchedule, setFormSchedule] = useState<Schedule219Payload | null>(null);
    const [formLoginError, setFormLoginError] = useState<Boolean | null>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(props.action === 'edit');
    const [error, setError] = useState<string | null>(null);

    const currentWeekPeriod = useSelector((state: RootState) => state.currentWeekPeriod)
    const {id} = useParams();

    useEffect(() => {
         if(props.action === 'edit') {
            const fetchSchedule = async () => {
                setLoading(true);
                const data = await getSchedule219LoadInfoById(id);
                setSchedule(data);
            };

            fetchSchedule()
                .then(() => {
                    setError(null)
                })
                .catch(() => setError('Не удалось получить нагрузку на 219 аудиторию.'))
                .finally(() => setLoading(false))
        }
    }, [id])

    return <>
        <header className={styles.header}>
            <div className={styles.button}>
                <NavLink className={styles.button__link} to='/'>В главное меню</NavLink>
            </div>
            <div className={styles.header__title}>
                {props.action === "edit" ? 'Редактирование нагрузки' : 'Создание новой нагрузки'}
            </div>
        </header>
        {loading && <Preloader/>}
        {!loading && error &&
            <h2 style={{
                color: 'red',
                textAlign: 'center',
                height: '80vh',
                alignContent: 'center',
                margin: '0'
            }}>{error}</h2>}
        {!loading && (schedule || props.action === 'create')
            && <>
                <main>
                    <h1>{props.action === "edit" ? 'Текущая нагрузка' : 'Новая нагрузка'}</h1>
                    <Formik
                        initialValues={{
                            id: schedule?.id,
                            localDate: schedule?.date,
                            localTime: schedule?.time,
                            type: schedule?.type,
                            responsible: schedule?.responsible,
                            description: schedule?.description
                        }}
                        validationSchema={Yup.object({
                            localDate: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            localTime: Yup.string()
                                .required('Required'),
                            type: Yup.string()
                                .max(60)
                                .required(),
                            responsible: Yup.string()
                                .max(40)
                                .required(),
                            description: Yup.string()
                                .max(1000)
                                .required()
                        })}
                        onSubmit={(values, {setSubmitting, setFieldError}) => {
                            props.action === 'edit' ?
                                editSchedule219(values, localStorage.getItem('authToken')) :
                                createSchedule219(values, localStorage.getItem('authToken'))
                                    .then(() => {
                                        setError(null)
                                    })
                                    .catch((reason) => {
                                        if (reason.response.status === 403) {
                                            setShowModal(true)
                                            setFormSchedule(values)
                                        } else if (reason.response.status === 400) {
                                            for (const [field, message] of Object.entries(reason.response.data as {
                                                [key: string]: string
                                            })) {
                                                setFieldError(field, message)
                                            }
                                        } else
                                            setError(props.action === "edit" ? 'Не удалось изменить нагрузку.' : 'Не удалось создать нагрузку.')
                                    })
                                    .finally(() => setSubmitting(false))
                        }}
                    >
                        {({isSubmitting, errors, touched}) => (
                            <Form className={stylesForInfo.main__create_form}>
                                <div className={stylesForInfo.form_div}>
                                    <label htmlFor="localDate">Дата:</label>
                                    <Field name="localDate" type="date" id="localDate"
                                           className={errors.localDate && touched.localDate ? stylesForInfo.error : ''}/>
                                    <ErrorMessage name="localDate" component="div"
                                                  className={stylesForInfo.error_message}/>
                                </div>
                                <div className={stylesForInfo.form_div}>
                                    <label htmlFor="localTime">Время:</label>
                                    <Field name="localTime" type="time" id="localTime"
                                           className={errors.localTime && touched.localTime ? stylesForInfo.error : ''}/>
                                    <ErrorMessage name="localTime" component="div"
                                                  className={stylesForInfo.error_message}/>
                                </div>
                                <div className={stylesForInfo.form_div}>
                                    <label htmlFor="type">Тип:</label>
                                    <Field name="type" type="text" id="type"
                                           className={errors.type && touched.type ? stylesForInfo.error : ''}/>
                                    <ErrorMessage name="type" component="div" className={stylesForInfo.error_message}/>
                                </div>
                                <div className={stylesForInfo.form_div}>
                                    <label htmlFor="responsible">Ответственный:</label>
                                    <Field name="responsible" type="text" id="responsible"
                                           className={errors.responsible && touched.responsible ? stylesForInfo.error : ''}/>
                                    <ErrorMessage name="responsible" component="div"
                                                  className={stylesForInfo.error_message}/>
                                </div>
                                <div className={stylesForInfo.form_div}>
                                    <label htmlFor="description">Комментарий:</label>
                                    <Field name="description" type="text" id="description" component="textarea"
                                           className={errors.description && touched.description ? stylesForInfo.error : ''}/>
                                    <ErrorMessage name="description" component="div"
                                                  className={stylesForInfo.error_message}/>
                                </div>
                                <button type="submit" disabled={isSubmitting}
                                        className={`${stylesForInfo.button} ${stylesForInfo.create_form__button}`}>
                                    {props.action === 'edit' ? 'Сохранить изменения' : 'Создать'}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {
                        props.action === 'edit' && <button onClick={() => {
                            deleteSchedule219(Number(id), localStorage.getItem('authToken'))
                                .then(() => {
                                    setError(null)
                                })
                                .catch((reason) => {
                                    if (reason.response.status === 403) {
                                        setShowModal(true)
                                    } else
                                        setError('Не удалось удалить нагрузку.')
                                })
                        }} type="button" className={`${stylesForInfo.button} ${stylesForInfo.create_form__button}`}>
                            Удалить нагрузку
                        </button>
                    }

                    <div className={`${styles.button} ${stylesForInfo.button__edit_form_margin_top}`}>
                        <NavLink className={styles.button__link}
                                 to={`/schedule/219?${generateQueryWeekPeriod(new Date(currentWeekPeriod.startDateTime),
                                     new Date(currentWeekPeriod.endDateTime))}`}>
                            Назад
                        </NavLink>
                    </div>

                    <Modal className={stylesForInfo.form_content}
                           isOpen={showModal}
                           onRequestClose={() => {
                               setFormLoginError(false)
                               setShowModal(false)
                           }}
                           contentLabel="Ошибка 403"
                           overlayClassName={stylesForInfo.dialog_content}
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
                                const authToken = localStorage.getItem('authToken') || b64EncodeUnicode(`${values.login}:${values.password}`);
                                props.action === 'edit' ?
                                    editSchedule219(formSchedule, authToken) :
                                    createSchedule219(formSchedule, authToken)
                                    .then(() => {
                                        setError(null)
                                        setFormLoginError(false)
                                        setShowModal(false)
                                        !localStorage.getItem('authToken') && localStorage.setItem('authToken', authToken)
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
                                    .finally(() => setSubmitting(false))
                            }}
                        >
                            {({isSubmitting, errors, touched}) => (
                                <Form>
                                    <div>
                                        <div className={stylesForInfo.form_div}>
                                            <label htmlFor='login'>Логин:</label>
                                            <Field name='login' type='text' id='login'
                                                   className={errors.login && touched.login ? stylesForInfo.error : ''}/>
                                            <ErrorMessage name='login' component='div'
                                                          className={stylesForInfo.error_message}/>
                                        </div>
                                        <div className={stylesForInfo.form_div}>
                                            <label htmlFor='password'>Пароль:</label>
                                            <Field name='password' type='password' id='password'
                                                   className={errors.password && touched.password ? stylesForInfo.error : ''}/>
                                            <ErrorMessage name='password' component='div'
                                                          className={stylesForInfo.error_message}/>
                                        </div>
                                        {formLoginError &&
                                            <p className={stylesForInfo.error_message_without_margin}>Неверно введены
                                                логин или пароль.</p>}
                                    </div>
                                    <div className={stylesForInfo.login_form__buttons}>
                                        <button
                                            className={`${stylesForInfo.button} ${stylesForInfo.create_form__button}`}
                                            type='submit'
                                            disabled={isSubmitting}>Ок
                                        </button>
                                        <button
                                            className={`${stylesForInfo.button} ${stylesForInfo.create_form__button}`}
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
                </main>
            </>
        }
    </>
}

export default Schedule219Info;