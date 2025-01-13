import React, {FC} from "react";
import {LoadInfo} from "../../../../../../api/schedule-backend-api";
import {_switchByDayNumber, mergeDayOfWeekRowsNumber219} from "../../../../../../utils/dates";
import styles from "../ScheduleTableContainer.module.css";
import generalStyles from "../../../../../../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../../../redux/store";
import {deleteLoadInfoInit, setLoadInfo, setShowLoadInfoModal} from "../../../../../../redux/modalSlice";
import Preloader from "../../../../../preloader/Preloader";

type ScheduleTableBodyLoadsInfoProps = {
    loadsInfo: LoadInfo[]
}

export const ScheduleTableBodyLoadsInfo: FC<ScheduleTableBodyLoadsInfoProps> = ({loadsInfo}) => {

    const dispatch = useDispatch<AppDispatch>()

    const operableIds = useSelector((state: RootState) => state.modal.operableIds)

    const sortedLoadsInfo = [...loadsInfo].map(item =>
        ({...item})).sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);

        return dateA.getTime() - dateB.getTime()
    })

    return <>
        {
            sortedLoadsInfo.map((value, index, array) => {
                    return (
                        <tr key={value.id}>{index > 0 && array[index]?.date === array[index - 1]?.date ? null :
                            <td rowSpan={mergeDayOfWeekRowsNumber219(sortedLoadsInfo, value.date)}
                                className={styles.thAndTdDayAndTime}>{_switchByDayNumber(value?.date)}</td>}
                            <td className={styles.thAndTdDayAndTime}>{value.time}</td>
                            <td>{value.type}</td>
                            <td>{value.responsible}</td>
                            <td>{value.description}</td>
                            <td>
                                {
                                    operableIds.includes(value.id as number) ?
                                        <Preloader/> :
                                        <>
                                            <button onClick={() => {
                                                dispatch(setLoadInfo(value));
                                                dispatch(setShowLoadInfoModal(true))
                                            }}
                                                    style={{margin: '5px'}}
                                                    className={`${generalStyles.button} ${generalStyles.formButton}`}>
                                                Изменить
                                            </button>
                                            <button onClick={() => {
                                                dispatch(deleteLoadInfoInit(value.id as number))
                                            }} type="button"
                                                    style={{margin: '5px'}}
                                                    className={`${generalStyles.button} ${generalStyles.formButton}`}>
                                                Удалить
                                            </button>
                                        </>
                                }
                            </td>
                        </tr>
                    )
                }
            )
        }
    </>
}