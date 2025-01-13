import React, {FC} from "react";
import styles from "../mainPage/MainPage.module.css";
import {NavLink} from "react-router-dom";

type MainPageProps = {
    startDateTime: number
    endDateTime: number
}

export const MainPage: FC<MainPageProps> = ({startDateTime, endDateTime}) => {

    const [startDate, endDate] =
        [new Date(startDateTime).toLocaleDateString('en-CA'),
            new Date(endDateTime).toLocaleDateString('en-CA')]

    const [firstFrameUrl, fourthFrameUrl, classesLoadInfoUrl] = [
        new URLSearchParams(
            {
                startDate: startDate,
                endDate: endDate,
                frame: 'FIRST'
            }
        ).toString(),
        new URLSearchParams(
            {
                startDate: startDate,
                endDate: endDate,
                frame: 'FOURTH'
            }
        ).toString(),
        new URLSearchParams(
            {
                startDate: startDate,
                endDate: endDate
            }
        ).toString()
    ]

    return <>
        <NavLink to={`/classes-schedule?${firstFrameUrl}`} className={styles.link}>Расписание аудиторий в 1-ом учебном
            корпусе</NavLink>

        <NavLink to={`/classes-schedule?${fourthFrameUrl}`} className={styles.link}>Расписание аудиторий в 4-ом учебном
            корпусе</NavLink>

        <NavLink to={`/loads-info-schedule?${classesLoadInfoUrl}`} className={styles.link}>Расписание занятости в 219
            аудитории</NavLink>
    </>
}