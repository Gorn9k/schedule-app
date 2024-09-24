import React, {FC} from "react";
import styles from "../ScheduleTableContainer.module.css";

type ScheduleTableHeaderClassScheduleProps = {
    classes: string[]
}

export const ScheduleTableHeaderClassSchedule: FC<ScheduleTableHeaderClassScheduleProps> = (props) => {

    return <>
        <tr>
            <th rowSpan={2} className={styles.thAndTdDayAndTime}>День недели</th>
            <th rowSpan={2} className={styles.thAndTdDayAndTime}>Время занятия</th>
            <th colSpan={props.classes.length}>Номер аудитории</th>
        </tr>
        <tr>
            {
                props.classes.map(value => <th key={value}>{value}</th>)

            }
        </tr>
    </>
}