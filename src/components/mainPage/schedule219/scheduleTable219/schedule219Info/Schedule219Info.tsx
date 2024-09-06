import React, {FC, useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import styles from "../../Schedule219.module.css";
import stylesForInfo from './Schedule219Info.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {editSchedule219, getSchedule219LoadInfoById, Schedule219} from '../../../../../api/schedule-backend-api';
import Preloader from "../../../../preloader/Preloader";

type Schedule219InfoProps = {
    action: 'create' | 'edit'
}

const Schedule219Info: FC<Schedule219InfoProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule219 | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {id} = useParams();

    useEffect(() => {
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

    }, [id])

    return <>
        <header className={styles.header}>
            <div className={styles.button}>
                <NavLink className={styles.button__link} to='/'>В главное меню</NavLink>
            </div>
            <div className={styles.header__title}>
                Редактирование нагрузки
            </div>
        </header>
        {loading && <Preloader/>}
        {!loading && error &&
            <h2 style={{color: 'red', textAlign: 'center', height: '80vh', alignContent: 'center', margin: '0'}}>{error}</h2>}
        {!loading && schedule
            && <>
                <main>
                    <h1>Текущая нагрузка</h1>
                    <Formik
                        initialValues={{id: schedule.id, localDate: schedule.date, localTime: schedule.time, type: schedule.type, responsible: schedule.responsible,
                            description: schedule.description}}
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
                            editSchedule219(values)
                                .then(() => {
                                    setError(null)
                                })
                                .catch((reason) => {
                                    if (reason.response.status === 400) {
                                        for (const [field, message] of Object.entries(reason.response.data as { [key: string]: string })) {
                                            setFieldError(field, message)
                                        }
                                    } else
                                        setError('Не удалось изменить нагрузку.')
                                })
                                .finally(() => setSubmitting(false))
                        }}
                    >
                        {({isSubmitting, errors, touched}) => (
                            <Form className={stylesForInfo.main__create_form}>
                                <label htmlFor="localDate">Дата</label>
                                <Field name="localDate" type="date" id="localDate" className={errors.localDate && touched.localDate ? stylesForInfo.error : ''}/>
                                <ErrorMessage name="localDate" component="div" className={stylesForInfo.error_message}/>

                                <label htmlFor="localTime">Время</label>
                                <Field name="localTime" type="time" id="localTime" className={errors.localTime && touched.localTime ? stylesForInfo.error : ''}/>
                                <ErrorMessage name="localTime" component="div" className={stylesForInfo.error_message}/>

                                <label htmlFor="type">Тип</label>
                                <Field name="type" type="text" id="type" className={errors.type && touched.type ? stylesForInfo.error : ''}/>
                                <ErrorMessage name="type" component="div" className={stylesForInfo.error_message}/>

                                <label htmlFor="responsible">Ответственный</label>
                                <Field name="responsible" type="text" id="responsible" className={errors.responsible && touched.responsible ? stylesForInfo.error : ''}/>
                                <ErrorMessage name="responsible" component="div" className={stylesForInfo.error_message}/>

                                <label htmlFor="description">Комментарий</label>
                                <Field name="description" type="text" id="description" component="textarea" className={errors.description && touched.description ? stylesForInfo.error : ''}/>
                                <ErrorMessage name="description" component="div" className={stylesForInfo.error_message}/>

                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/*<Formik*/}
                    {/*    initialValues={{name: '', email: ''}}*/}
                    {/*    validationSchema={Yup.object({*/}
                    {/*        name: Yup.string()*/}
                    {/*            .max(15, 'Must be 15 characters or less')*/}
                    {/*            .required('Required'),*/}
                    {/*        email: Yup.string()*/}
                    {/*            .email('Invalid email address')*/}
                    {/*            .required('Required'),*/}
                    {/*    })}*/}
                    {/*    onSubmit={(values, {setSubmitting}) => {*/}
                    {/*        setTimeout(() => {*/}
                    {/*            alert(JSON.stringify(values, null, 2));*/}
                    {/*            setSubmitting(false);*/}
                    {/*        }, 400);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {({isSubmitting}) => (*/}
                    {/*        <Form>*/}
                    {/*            <label htmlFor="name">Name</label>*/}
                    {/*            <Field name="name" type="text"/>*/}
                    {/*            <ErrorMessage name="name" component="div"/>*/}

                    {/*            <label htmlFor="email">Email</label>*/}
                    {/*            <Field name="email" type="email"/>*/}
                    {/*            <ErrorMessage name="email" component="div"/>*/}

                    {/*            <button type="submit" disabled={isSubmitting}>*/}
                    {/*                Submit*/}
                    {/*            </button>*/}
                    {/*        </Form>*/}
                    {/*    )}*/}
                    {/*</Formik>*/}
                </main>
            </>
        }
    </>
}

export default Schedule219Info;