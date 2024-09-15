import React, {FC} from "react";
import stylesFromSchedule from "../../../Schedule.module.css";
import styles from "../../ScheduleTable.module.css";
import {Link} from "react-router-dom";
import stylesFromScheduleTable from "../../ScheduleTable.module.css";

type ScheduleTableHeaderLoadsInfoProps = {
    isOverflowing: boolean
}

export const ScheduleTableHeaderLoadsInfo: FC<ScheduleTableHeaderLoadsInfoProps> = (props) => {

    return <>
        <div className={`${stylesFromSchedule.button} ${styles.buttonAddLoadInfo}`}>
            <Link to={`/loads-info/create`}>Добавить нагрузку</Link>
        </div>
        <table className={stylesFromScheduleTable.scheduleTableHeader}>
            <thead className={stylesFromScheduleTable.scheduleHeader}>
            <tr>
                <th className={stylesFromScheduleTable.thAndTdDayAndTime}>День недели</th>
                <th className={stylesFromScheduleTable.thAndTdDayAndTime}>Время</th>
                <th>Тип</th>
                <th>Ответственный</th>
                <th>Комментарий</th>
                <th>Действие</th>
            </tr>
            </thead>
        </table>
    </>
}