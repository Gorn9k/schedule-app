import React, {FC} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {Header} from "../header/Header";
import {ScheduleMain} from "./scheduleMain/ScheduleMain";
import styles from "./Schedule.module.css";

const Schedule: FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const startDate = queryParams.get('startDate')
    const endDate = queryParams.get('endDate')
    const frame = queryParams.get('frame')

    isNaN(new Date(!startDate ? '' : startDate).valueOf()) ||
    isNaN(new Date(!endDate ? '' : endDate).valueOf()) ||
    (frame && (frame !== 'FIRST' && frame !== 'FOURTH')) &&
    useNavigate()('/')

    const title = (!frame && 'Расписание занятости в 219 аудитории')
        || (frame === 'FIRST' && 'Расписание аудиторий(ЦИТ) в первом учебном корпусе') || 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'

    return (
        <>
            <Header>
                <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                {title}
            </Header>
            <ScheduleMain/>
        </>
    )
}

export default Schedule;
