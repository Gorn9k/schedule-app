import React, {FC, useEffect} from 'react';
import styles from './MainPage.module.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {reset} from "../../redux/currentWeekPeriodSlice";
import {generateRequestParamWeekPeriodByDate} from "../../utils/dates";

const MainPage : FC = () => {

    const currentWeekPeriod = useSelector((state : RootState) => state.currentWeekPeriod);
    const dispatch = useDispatch<AppDispatch>();
    const queryDatePeriod = generateRequestParamWeekPeriodByDate(new Date(currentWeekPeriod.startDateTime));

    useEffect(() => {
        // console.log(`Date changed ${currentDate}`)
        const timerId = setInterval(() => {
            dispatch(reset())
        }, 100);

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
                        <Link to={`/class-schedule?${queryDatePeriod}&frame=FIRST`}>Расписание аудиторий в 1-ом учебном корпусе</Link>
                    </p>
                    <p>
                        <Link to={`/class-schedule?${queryDatePeriod}&frame=FOURTH`}>Расписание аудиторий в 4-ом учебном корпусе</Link>
                    </p>
                    <p>
                        <Link to={`/loads-info?${queryDatePeriod}`}>Расписание занятости в 219
                            аудитории</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default MainPage;
