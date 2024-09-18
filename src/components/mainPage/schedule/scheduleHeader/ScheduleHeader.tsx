import generalStyles from "../../../../App.module.css";
import {NavLink} from "react-router-dom";
import styles from "../Schedule.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export const ScheduleHeader = () => {

    const frame = useSelector((state: RootState) => state.schedule.frame)
    const title = (!frame && 'Расписание занятости в 219 аудитории')
        || (frame === 'FIRST' && 'Расписание аудиторий(ЦИТ) в первом учебном корпусе') || 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'

    return (
        <header className={generalStyles.title}>
            <NavLink to='/' className={styles.link}>В главное меню</NavLink>
            {title}
        </header>
    )
}