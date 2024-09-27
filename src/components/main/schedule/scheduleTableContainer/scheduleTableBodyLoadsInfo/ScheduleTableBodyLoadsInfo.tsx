import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {Schedule219} from "../../../../../api/schedule-backend-api";
import {_switchByDayNumber, mergeDayOfWeekRowsNumber219} from "../../../../../utils/dates";
import styles from '../ScheduleTableContainer.module.css'
import stylesFromSchedule from "../../Schedule.module.css";

type ScheduleTableBodyLoadsInfoProps = {
    schedule: Schedule219[]
}

export const ScheduleTableBodyLoadsInfo: FC<ScheduleTableBodyLoadsInfoProps> = (props) => {

    return <>
        {props.schedule.map((value, index, array) => {
                return (
                    <tr key={value.id}>{index > 0 && array[index]?.date === array[index - 1]?.date ? null :
                        <td rowSpan={mergeDayOfWeekRowsNumber219(props.schedule as Schedule219[], value.date)}
                            className={styles.thAndTdDayAndTime}>{_switchByDayNumber(value?.date)}</td>}
                        <td className={styles.thAndTdDayAndTime}>{value.time}</td>
                        <td>{value.type}</td>
                        <td>{value.responsible}</td>
                        <td>{value.description}</td>
                        <td>
                            <NavLink className={`${styles.buttonEditLoadInfo} ${stylesFromSchedule.link}`}
                                     to={`/loads-info/${value.id}/edit`}>
                                Изменить
                            </NavLink>
                        </td>
                    </tr>
                )
            }
        )
        }
    </>
}