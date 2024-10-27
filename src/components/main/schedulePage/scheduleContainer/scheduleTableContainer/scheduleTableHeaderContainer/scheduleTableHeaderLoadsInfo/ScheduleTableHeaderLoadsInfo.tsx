import React, {FC} from "react";
import styles from "../../ScheduleTableContainer.module.css";

type ScheduleTableHeaderLoadsInfoProps = {

}

export const ScheduleTableHeaderLoadsInfo: FC<ScheduleTableHeaderLoadsInfoProps> = (props) => {

    return <>
            <tr>
                <th className={styles.thAndTdDayAndTime}>День недели</th>
                <th className={styles.thAndTdDayAndTime}>Время</th>
                <th>Тип</th>
                <th>Ответственный</th>
                <th>Комментарий</th>
                <th>Действие</th>
            </tr>
    </>
}