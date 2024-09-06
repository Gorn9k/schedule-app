import React, {FC, useEffect} from 'react';
import styles from './MainPage.module.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {reset} from "../../redux/currentWeekPeriodSlice";

const MainPage : FC = () => {

    const generateQueryWeekPeriod = (startDate: Date, endDate : Date): string => {
        const firstDayOfWeek = startDate.getDate() - (startDate.getDay() === 0 ? 7 : startDate.getDay()) + 1;
        const firstDayOfWeekDate = new Date(new Date().setDate(firstDayOfWeek));
        const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        const lastDayOfWeek = firstDayOfWeekDate.getDate() + 6;
        const lastDayOfWeekDate = new Date(firstDayOfWeekDate.setDate(lastDayOfWeek));
        const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
    }

    const currentWeekPeriod = useSelector((state : RootState) => state.currentWeekPeriod);
    const dispatch = useDispatch<AppDispatch>();
    const queryDatePeriod = generateQueryWeekPeriod(new Date(currentWeekPeriod.startDateTime), new Date(currentWeekPeriod.endDateTime));

    useEffect(() => {
        // console.log(`Date changed ${currentDate}`)
        const timerId = setInterval(() => {
            dispatch(reset())
        }, 1000);

        return () => clearInterval(timerId);
    }, [dispatch]);

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
