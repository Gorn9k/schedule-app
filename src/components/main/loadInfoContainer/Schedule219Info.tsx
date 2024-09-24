import React, {FC, useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from "../schedule/Schedule.module.css";
import stylesForInfo from './Schedule219Info.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Modal from 'react-modal';
import {
    b64EncodeUnicode,
    createSchedule219,
    deleteSchedule219,
    editSchedule219,
    getSchedule219LoadInfoById,
    Schedule219,
    Schedule219Payload
} from "../../../api/schedule-backend-api";
import Preloader from "../../preloader/Preloader";
import {LoadInfoForm} from "./loadInfo/loadInfoForm/LoadInfoForm";
import {AuthModalForm} from "./authForm/AuthModalForm";

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

    const {id} = useParams();
    const navigate = useNavigate();


    // const tablePageAddress = `/loads-info?${new URLSearchParams(
    //     {
    //         startDate: new Date(currentWeekPeriod.startDateTime).toLocaleDateString('en-CA'),
    //         endDate: new Date(currentWeekPeriod.endDateTime).toLocaleDateString('en-CA'),
    //     })}`

    useEffect(() => {
        if (props.action === 'edit') {
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
    }, [id, props.action])

    return null
}

export default Schedule219Info;