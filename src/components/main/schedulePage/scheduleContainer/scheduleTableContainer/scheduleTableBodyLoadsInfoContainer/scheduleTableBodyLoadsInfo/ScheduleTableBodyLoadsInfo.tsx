import React, {FC} from "react";
import {Schedule219} from "../../../../../../../api/schedule-backend-api";
import {_switchByDayNumber, mergeDayOfWeekRowsNumber219} from "../../../../../../../utils/dates";
import styles from "../../ScheduleTableContainer.module.css";
import generalStyles from "../../../../../../../App.module.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../../redux/store";
import {deleteLoadInfo, setLoadInfo, setShowLoadInfoModal} from "../../../../../../../redux/loadInfoSlice";

type ScheduleTableBodyLoadsInfoProps = {
    schedule: Schedule219[]
}

export const ScheduleTableBodyLoadsInfo: FC<ScheduleTableBodyLoadsInfoProps> = (props) => {

    const dispatch = useDispatch<AppDispatch>()

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
                            <button onClick={() => {
                                dispatch(setLoadInfo(value));
                                dispatch(setShowLoadInfoModal(true))
                            }}
                                    className={`${styles.buttonEditLoadInfo} ${generalStyles.link}`}>
                                Изменить
                            </button>
                            <button onClick={() => {
                                dispatch(deleteLoadInfo(value.id as number))
                            }} type="button" className={`${generalStyles.button} ${generalStyles.formButton}`}>
                                Удалить
                            </button>
                        </td>
                    </tr>
                )
            }
        )
        }
    </>
}