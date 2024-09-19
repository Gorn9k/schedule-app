import React, {FC} from "react";
import styles from "../ScheduleTableContainer.module.css";
import Preloader from "../../../../preloader/Preloader";

type ScheduleTableHeaderClassScheduleProps = {
    classes: string[] | null
    isLoading: boolean
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
        <tr>
            {
                !props.isLoading && props.classes && props.classes.length > 0 ?
                    props.classes?.map(value => <th key={value}>{value}</th>)
                    : <th>
                        <Preloader/>
                    </th>
            }
        </tr>
    </>
}