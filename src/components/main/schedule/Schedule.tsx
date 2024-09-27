import React, {FC, useEffect} from 'react'
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import styles from "./Schedule.module.css";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";

const Schedule: FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const navigate = useNavigate();

    const startDateParam = queryParams.get('startDate')
    const endDateParam = queryParams.get('endDate')

    const startDate = (startDateParam && new Date(startDateParam)) || null
    const endDate = (endDateParam && new Date(endDateParam)) || null
    const frame = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null

    const badRequest = !startDate || isNaN(startDate.valueOf()) || !endDate || isNaN(endDate.valueOf())
        || startDate > endDate

    useEffect(() => {
        if (badRequest) {
            navigate('/')
        }
    }, [badRequest, navigate]);

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    return (!badRequest && <>
            <h2>{weekPeriodBlockName}</h2>
            <WeekPeriodBlock to={(frame && '/class-schedule') || '/loads-info'}
                             startDate={startDate as Date}
                             endDate={endDate as Date}
                             requestParams={(frame && {frame: frame}) || undefined}/>

        {
            !frame && <NavLink to={`/loads-info/create`} className={`${styles.link} ${styles.addLoadInfoLink}`}>Добавить нагрузку</NavLink>
        }
        <ScheduleTableContainer startDate={startDate}
                                endDate={endDate}
                                frame={frame}/>
    </>) || null
}

export default Schedule;
