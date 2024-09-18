import React, {FC} from "react";
import styles from "../../ScheduleTable.module.css";

type ScheduleTableHeaderClassScheduleProps = {
    classes: string[]
}

export const ScheduleTableHeaderClassSchedule: FC<ScheduleTableHeaderClassScheduleProps> = (props) => {

    return <>
        <tr>
            <th rowSpan={2} className={styles.thAndTdDayAndTime}>День недели</th>
            <th rowSpan={2} className={styles.thAndTdDayAndTime}>Время занятия</th>
            <th colSpan={props.classes && props.classes.length > 0 ? props.classes.length : undefined}>Номер
                аудитории
            </th>
        </tr>
        {props.classes && props.classes.length > 0 ?
            <tr>
                {props.classes?.map(value => <th key={value}>{value}</th>)}
            </tr> : null
        }
    </>
}