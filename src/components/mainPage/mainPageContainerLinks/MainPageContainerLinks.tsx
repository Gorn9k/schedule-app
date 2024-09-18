import styles from "../MainPage.module.css";
import {MainPageNavLink} from "./mainPageNavLink/MainPageNavLink";
import React, {useEffect} from "react";
import {generateCurrentEndDateMilliseconds, generateCurrentStartDateMilliseconds} from "../../../utils/dates";

type CurrentWeekPeriod = {
    startDateTime: number
    endDateTime: number
}

export const MainPageContainerLinks = () => {

    const [currentWeekPeriod, setCurrentWeekPeriod] =
        React.useState<CurrentWeekPeriod>(
            {
                startDateTime: generateCurrentStartDateMilliseconds(),
                endDateTime: generateCurrentEndDateMilliseconds()
            }
        );

    const [startDate, endDate] =
        [new Date(currentWeekPeriod.startDateTime).toLocaleDateString('en-CA'),
        new Date(currentWeekPeriod.endDateTime).toLocaleDateString('en-CA')]

    useEffect(() => {
        // console.log(`Date changed ${currentDate}`)
        const timerId = setInterval(() => {
            setCurrentWeekPeriod({
                startDateTime: generateCurrentStartDateMilliseconds(),
                endDateTime: generateCurrentEndDateMilliseconds()
            })
        }, 100);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className={styles.containerLinks}>

            <MainPageNavLink to={`/class-schedule`}
                             text={'Расписание аудиторий в 1-ом учебном корпусе'}
                             requestParams={
                                 {
                                     startDate: startDate,
                                     endDate: endDate,
                                     frame: 'FIRST'
                                 }
                             }/>
            <MainPageNavLink to={`/class-schedule`}
                             text={'Расписание аудиторий в 4-ом учебном корпусе'}
                             requestParams={
                                 {
                                     startDate: startDate,
                                     endDate: endDate,
                                     frame: 'FOURTH'
                                 }
                             }/>
            <MainPageNavLink to={`/loads-info`}
                             text={'Расписание занятости в 219 аудитории'}
                             requestParams={
                                 {
                                     startDate: startDate,
                                     endDate: endDate
                                 }
                             }/>
        </div>
    )
}