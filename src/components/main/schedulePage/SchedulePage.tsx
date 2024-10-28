import React, {FC} from "react";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import styles from "./SchedulePage.module.css";
import {FrameType} from "../../../redux/scheduleSlice";
import {withFrame} from "../../../hocs/withFrame";
import {withStartDateAndEndDate} from "../../../hocs/withStartDateAndEndDate";
import {Outlet} from "react-router-dom";
import {ScheduleContainer} from "./scheduleContainer/ScheduleContainer";

export const SchedulePage: FC = () => {

    const WeekPeriodBlockName: FC<{frame: FrameType}> = ({frame}) => {

        const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

        return <h2>{weekPeriodBlockName}</h2>
    }

    const EnhancedWeekPeriodBlockName = withFrame(WeekPeriodBlockName)

    const EnhancedWeekPeriodBlock = withStartDateAndEndDate(withFrame(WeekPeriodBlock))

    return <>
        <EnhancedWeekPeriodBlockName/>
        <div className={styles.weekPeriodBlock}>
            <EnhancedWeekPeriodBlock/>
        </div>
        <Outlet/>
        <ScheduleContainer/>
    </>
}