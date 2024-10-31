import React, {FC} from "react";
import styles from "../../ScheduleTableContainer.module.css";

export const ScheduleTableHeaderLoadsInfo: FC = () => {

    return <>
            <tr>
                <th className={styles.thAndTdDayAndTime}>День недели</th>
                <th className={styles.thAndTdDayAndTime}>Время</th>
                <th>Тип</th>
                <th>Ответственный</th>
                <th>Комментарий</th>
                <th className={styles.thAndTdActions}>Действия</th>
            </tr>
    </>
}