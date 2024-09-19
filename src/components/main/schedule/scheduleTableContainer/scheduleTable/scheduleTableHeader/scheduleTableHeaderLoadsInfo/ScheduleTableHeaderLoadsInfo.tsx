import React, {FC} from "react";
import stylesFromSchedule from "../../../Schedule.module.css";
import styles from "../../ScheduleTable.module.css";
import {Link} from "react-router-dom";
import stylesFromScheduleTable from "../../ScheduleTable.module.css";

type ScheduleTableHeaderLoadsInfoProps = {

}

export const ScheduleTableHeaderLoadsInfo: FC<ScheduleTableHeaderLoadsInfoProps> = (props) => {

    return <>
            <tr>
                <th className={stylesFromScheduleTable.thAndTdDayAndTime}>День недели</th>
                <th className={stylesFromScheduleTable.thAndTdDayAndTime}>Время</th>
                <th>Тип</th>
                <th>Ответственный</th>
                <th>Комментарий</th>
                <th>Действие</th>
            </tr>
    </>
}