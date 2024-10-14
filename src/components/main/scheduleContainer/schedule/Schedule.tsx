import React, {FC} from "react";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import {NavLink} from "react-router-dom";
import generalStyles from "../../../../App.module.css";
import styles from "../ScheduleContainer.module.css";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";

type ScheduleProps = {
    startDate: Date
    endDate: Date
    frame: 'FIRST' | 'FOURTH' | null
}

export const Schedule: FC<ScheduleProps> = ({startDate, endDate, frame}) => {

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    return <>
        <h2>{weekPeriodBlockName}</h2>
        <WeekPeriodBlock to={(frame && '/class-schedule') || '/loads-info'}
                         startDate={startDate as Date}
                         endDate={endDate as Date}
                         requestParams={(frame && {frame: frame}) || undefined}/>

        {
            !frame && <NavLink to={`/loads-info/create`} className={`${generalStyles.link} ${styles.addLoadInfoLink}`}>Добавить
                нагрузку</NavLink>
        }
        <ScheduleTableContainer startDate={startDate}
                                endDate={endDate}
                                frame={frame}/>
    </>
}