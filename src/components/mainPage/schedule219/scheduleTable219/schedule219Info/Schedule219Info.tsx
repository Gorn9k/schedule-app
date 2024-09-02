import React, {FC, useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import styles from "../../Schedule219.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {getSchedule219LoadInfoById, Schedule219} from '../../../../../api/schedule-backend-api';
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

    }, [])

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
                        initialValues={{day: schedule.day, time: schedule.time, type: schedule.type,
                            responsible: schedule.responsible, description: schedule.description}}
                        validationSchema={Yup.object({
                            day: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            time: Yup.string()
                                .email('Invalid email address')
                                .required('Required'),
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <label htmlFor="day">Дата</label>
                                <Field name="day" type="date"/>
                                <ErrorMessage name="day" component="div"/>

                                <label htmlFor="time">Время</label>
                                <Field name="time" type="time"/>
                                <ErrorMessage name="time" component="div"/>

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