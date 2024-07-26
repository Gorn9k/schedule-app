import React, {FC} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom"
import styles from "./Schedule.module.css"
import ScheduleTable from "./scheduleTable/ScheduleTable";

const Schedule : FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const startDate = new Date(queryParams.get('startDate') || Date.now())
    const endDate = new Date(queryParams.get('endDate') || Date.now())
    const frame = queryParams.get('frame')

    const _generateQueryDatePeriod = (date : Date) => {
        const firstDayOfWeek = date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1
        const lastDayOfWeek = firstDayOfWeek + 6
        const firstDayOfWeekDate = new Date(date.setDate(firstDayOfWeek))
        const lastDayOfWeekDate = new Date(date.setDate(lastDayOfWeek))

        const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`
        const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`

        return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
    }

    const generateNextQueryDatePeriod = (date : Date) => {
        date.setDate(date.getDate() + 7)
        return _generateQueryDatePeriod(date)
    }
    const generatePrevQueryDatePeriod = (date : Date) => {
        date.setDate(date.getDate() - 7)
        return _generateQueryDatePeriod(date)
    }

    const generateContainerDatePeriod = (startDate : Date, endDate : Date) => {

        const firstDayOfWeekString = `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getFullYear()}`;
        const lastDayOfWeekString = `${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getFullYear()}`;

        return `${firstDayOfWeekString} - ${lastDayOfWeekString}`;
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.button}>
                    <NavLink className={styles.button__link} to='/'>В главное меню</NavLink>
                </div>
                <div className={styles.header__title}>{`${frame === 'FIRST' ? 
                    'Расписание аудиторий(ЦИТ) в первом учебном корпусе' : 
                    'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'}`}
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.main__date_period_container}>
                    Период занятий
                    <div>
                        <Link to={`/schedule?${generatePrevQueryDatePeriod(new Date(startDate))}&frame=${frame === 'FIRST' ? 'FIRST' : 'FOURTH'}`}>{'<<'}</Link>
                        <div>{`${generateContainerDatePeriod(new Date(startDate), new Date(endDate))}`}</div>
                        <Link to={`/schedule?${generateNextQueryDatePeriod(new Date(startDate))}&frame=${frame === 'FIRST' ? 'FIRST' : 'FOURTH'}`}>{'>>'}</Link>
                    </div>
                </div>
                <ScheduleTable startDate={startDate.toISOString().split('T')[0]}
                               endDate={endDate.toISOString().split('T')[0]}
                               frame={frame && frame === 'FIRST' ? 'FIRST' : 'FOURTH'} />
            </main>
        </>
    )
}

export default Schedule;
