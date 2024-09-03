import React, {FC, useEffect, useState} from 'react';
import styles from './MainPage.module.css';
import {Link} from "react-router-dom";

export const generateCurrentStartDate = (): Date => {
    const today = new Date()

    const firstDayOfWeek = today.getDate() - (today.getDay() === 0 ? 7 : today.getDay()) + 1

    return new Date(today.setDate(firstDayOfWeek))
}

export const generateCurrentEndDate = (): Date => {
    const today = new Date();

    const lastDayOfWeek = today.getDate() + (today.getDay() === 0 ? 0 : 7 - today.getDay())

    return new Date(today.setDate(lastDayOfWeek))
}

const MainPage : FC = () => {

    const generateQueryDatePeriod = (date: Date): string => {
        const firstDayOfWeek = date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1;
        const firstDayOfWeekDate = new Date(new Date().setDate(firstDayOfWeek));
        const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        const lastDayOfWeek = firstDayOfWeekDate.getDate() + 6;
        const lastDayOfWeekDate = new Date(firstDayOfWeekDate.setDate(lastDayOfWeek));
        const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
    }

    const resetTimeInDate = (date: Date): Date => {
        date.setHours(0, 0, 0, 0)
        return date
    }

    const [currentDate, setCurrentDate] = useState(resetTimeInDate(new Date()));
    const queryDatePeriod = generateQueryDatePeriod(currentDate);

    useEffect(() => {
        // console.log(`Date changed ${currentDate}`)
        const timerId = setInterval(() => {
            setCurrentDate((prevDate) => {
                const newDate = resetTimeInDate(new Date())
                return newDate.getTime() !== prevDate.getTime() ? newDate : prevDate;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <>
            <header className={styles.header}>
                Расписание занятости в аудиториях(ЦИТ)
            </header>

            <main className={styles.main}>
                <div>
                    <p>
                        <Link to={`/schedule?${queryDatePeriod}&frame=FIRST`}>Расписание аудиторий в 1-ом учебном корпусе</Link>
                    </p>
                    <p>
                        <Link to={`/schedule?${queryDatePeriod}&frame=FOURTH`}>Расписание аудиторий в 4-ом учебном корпусе</Link>
                    </p>
                    <p>
                        <Link to={`/schedule/219?${queryDatePeriod}`}>Расписание занятости в 219
                            аудитории</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default MainPage;
