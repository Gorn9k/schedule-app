import React, {FC} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import styles from "./Schedule.module.css";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";
import stylesFromSchedule from "*.module.css";

const Schedule: FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const navigate = useNavigate();

    const startDateParam = queryParams.get('startDate')
    const endDateParam = queryParams.get('endDate')

    const startDate = (startDateParam && new Date(startDateParam)) || null
    const endDate = (endDateParam && new Date(endDateParam)) || null
    const frame = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null

    if (!startDate || !endDate || startDate > endDate) {
        navigate('/')
        return null
    }

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    return <>
        <div className={styles.weekPeriodBlock}>
            {weekPeriodBlockName}
            <WeekPeriodBlock to={'/class-schedule'}
                             startDate={startDate as Date}
                             endDate={endDate as Date}
                             requestParams={(frame && {frame: frame}) || undefined}/>
        </div>
        {
            !frame && <div className={`${stylesFromSchedule.button} ${styles.buttonAddLoadInfo}`}>
                <Link to={`/loads-info/create`}>Добавить нагрузку</Link>
            </div>
        }
        <ScheduleTableContainer startDate={startDate}
                                endDate={endDate}
                                frame={frame}/>
    </>
}

export default Schedule;
