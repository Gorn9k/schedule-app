import React, {FC} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom"
import styles from "./Schedule219.module.css"
import ScheduleTable219 from './scheduleTable219/ScheduleTable219';
import {next, prev} from "../../../redux/currentWeekPeriodSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";

const Schedule219 : FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const startDate = new Date(queryParams.get('startDate') || Date.now())
    const endDate = new Date(queryParams.get('endDate') || Date.now())

    const dispatch = useDispatch<AppDispatch>()

    const _generateQueryDatePeriod = (date : Date) => {
        const firstDayOfWeek = date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1;
        const firstDayOfWeekDate = new Date(new Date(date).setDate(firstDayOfWeek));
        const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        const lastDayOfWeek = firstDayOfWeekDate.getDate() + 6;
        const lastDayOfWeekDate = new Date(firstDayOfWeekDate.setDate(lastDayOfWeek));
        const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
    }

    const generateNextQueryDatePeriod = (date : Date) => _generateQueryDatePeriod(new Date(new Date(endDate).setDate(date.getDate() + 7)))

    const generatePrevQueryDatePeriod = (date : Date) => _generateQueryDatePeriod(new Date(new Date(startDate).setDate(date.getDate() - 7)))

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
                <div className={styles.header__title}>
                    Расписание занятости в 219 аудитории
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.main__date_period_container}>
                    Период занятости
                    <div>
                        <Link onClick={() => dispatch(prev())} to={`/schedule/219?${generatePrevQueryDatePeriod(startDate)}`}>{'<<'}</Link>
                        <div>{`${generateContainerDatePeriod(startDate, endDate)}`}</div>
                        <Link onClick={() => dispatch(next())} to={`/schedule/219?${generateNextQueryDatePeriod(endDate)}`}>{'>>'}</Link>
                    </div>
                </div>
                <ScheduleTable219 startDate={startDate.toISOString().split('T')[0]}
                                  endDate={endDate.toISOString().split('T')[0]}/>
            </main>
        </>
    )
}

export default Schedule219;
