import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {
    b64EncodeUnicode,
    createSchedule219,
    deleteSchedule219,
    editSchedule219,
    getSchedule219LoadInfoById,
    Schedule219
} from "../../../api/schedule-backend-api";
import Preloader from "../../preloader/Preloader";
import {LoadInfoForm} from "./loadInfoForm/LoadInfoForm";
import styles from "../schedule/Schedule.module.css";
import stylesForInfo from "./Schedule219Info.module.css";
import mainStyles from './LoadInfoContainer.module.css'
import {AuthModalForm} from "./authForm/AuthModalForm";

export const LoadInfoContainer = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [schedule, setSchedule] = useState<Schedule219 | null>(null);
    const [formSchedule, setFormSchedule] = useState<Schedule219 | null>(null)
    const [formLoginError, setFormLoginError] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(!!id)
    const [error, setError] = useState<string | null>(null)

    console.log('Load Info Container');

    const onSubmit = (values: Schedule219, setSubmitting: (isSubmitting: boolean) => void,
                      setFieldError: (field: string, message: (string | undefined)) => void) => {
        setLoading(true);
        ((id && editSchedule219) || createSchedule219)(values, localStorage.getItem('authToken'))
            .then(() => {
                setError(null)
                navigate(-1)
            })
            .catch((reason) => {
                if (reason.response && reason.response.status === 403) {
                    setShowModal(true)
                    setFormSchedule(values)
                    setSchedule(values)
                } else if (reason.response && reason.response.status === 400) {
                    for (const [field, message] of Object.entries(reason.response.data as {
                        [key: string]: string
                    })) {
                        setFieldError(field, message)
                    }
                } else
                    setError(`Не удалось ${(id && 'изменить') || 'сохранить'} нагрузку.`)
            })
            .finally(() => {
                setLoading(false)
                setSubmitting(false)
            })
    }

    const onSubmitAuth = (values: { login: string, password: string }, setSubmitting: (isSubmitting: boolean) => void,
                          setFieldError: (field: string, message: (string | undefined)) => void) => {
        const authToken = localStorage.getItem('authToken') || b64EncodeUnicode(`${values.login}:${values.password}`);
        setLoading(true);
        ((id && editSchedule219) || createSchedule219)(formSchedule, authToken)
            .then(() => {
                setError(null)
                setFormLoginError(false)
                setShowModal(false)
                !localStorage.getItem('authToken') && localStorage.setItem('authToken', authToken)
                navigate(-1)
            })
            .catch((reason) => {
                if (reason.response && reason.response.status === 403) {
                    setShowModal(true)
                    setFormLoginError(true)
                    localStorage.getItem('authToken') && localStorage.removeItem('authToken')
                } else if (reason.response && reason.response.status === 400) {
                    for (const [field, message] of Object.entries(reason.response.data as {
                        [key: string]: string
                    })) {
                        setFieldError(field, message)
                    }
                } else
                    setError(`Не удалось ${(id && 'изменить') || 'сохранить'} нагрузку.`)
            })
            .finally(() => {
                setLoading(false)
                setSubmitting(false)
            })
    }

    useEffect(() => {
        if (id) {
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

    return <div className={mainStyles.loadInfoContainer}>
        {
            (loading && <Preloader/>)
            || (!loading && error &&
                <h2 style={{
                    color: 'red',
                    textAlign: 'center',
                    height: '80vh',
                    alignContent: 'center',
                    margin: '0'
                }}>{error}</h2>)
            || (!loading &&
                <>
                    <h2>{`${(id && 'Текущая') || 'Новая'} нагрузка`}</h2>
                    <LoadInfoForm schedule={schedule ? schedule : undefined} onSubmit={onSubmit} renderButton={
                        (props: { disabled: boolean }) =>
                            <button type="submit" disabled={props.disabled}
                                    className={`${styles.button} ${stylesForInfo.formButton}`}>{(id && 'Сохранить изменения') || 'Создать'}</button>
                    }/>
                    {
                        id && <button onClick={() => {
                            setLoading(true)
                            deleteSchedule219(Number(id), localStorage.getItem('authToken'))
                                .then(() => {
                                    setError(null)
                                    navigate(-1)
                                })
                                .catch((reason) => {
                                    if (reason.response.status === 403) {
                                        setShowModal(true)
                                    } else
                                        setError('Не удалось удалить нагрузку.')
                                })
                                .finally(() => setLoading(false))
                        }} type="button" className={`${styles.button} ${stylesForInfo.formButton}`}>
                            Удалить нагрузку
                        </button>
                    }
                    {showModal && <AuthModalForm formLoginError={formLoginError}
                                                 showModal={showModal}
                                                 setShowModal={setShowModal}
                                                 setFormLoginError={setFormLoginError}
                                                 onSubmit={onSubmitAuth}/>
                    }
                </>
            )
        }
        <NavLink className={`${styles.button} ${stylesForInfo.formButton}`} onClick={() => navigate(-1)} to={''}>
            Назад
        </NavLink>
    </div>
}