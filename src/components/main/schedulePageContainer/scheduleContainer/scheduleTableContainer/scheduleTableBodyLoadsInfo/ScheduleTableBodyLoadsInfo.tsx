import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {deleteSchedule219, Schedule219} from "../../../../../../api/schedule-backend-api";
import {_switchByDayNumber, mergeDayOfWeekRowsNumber219} from "../../../../../../utils/dates";
import styles from "../ScheduleTableContainer.module.css";
import generalStyles from "../../../../../../App.module.css";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../redux/store";
import {setLoadInfoId, setShowLoadInfoModal} from "../../../../../../redux/showModalSlice";

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
                                dispatch(setLoadInfoId(value.id));
                                dispatch(setShowLoadInfoModal(true))
                            }}
                                    className={`${styles.buttonEditLoadInfo} ${generalStyles.link}`}>
                                Изменить
                            </button>
                            <button onClick={() => {
                                setLoading(true)
                                deleteSchedule219(Number(id), localStorage.getItem('authToken'))
                                    .then(() => {
                                        setError(null)
                                        navigate(-1)
                                    })
                                    .catch((reason) => {
                                        if (reason.response && reason.response.status === 403) {
                                            setShowModal(true)
                                        } else
                                            setError('Не удалось удалить нагрузку.')
                                    })
                                    .finally(() => setLoading(false))
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