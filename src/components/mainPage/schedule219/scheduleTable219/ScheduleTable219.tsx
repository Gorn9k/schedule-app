import React, {FC, useEffect, useState} from 'react'
import styles from './ScheduleTable219.module.css'
import Preloader from "../../../preloader/Preloader";
import {getSchedule219, Schedule219} from '../../../../api/schedule-backend-api';
import {NavLink} from "react-router-dom";

type ScheduleTablePropsType = {
    startDate: string
    endDate: string
}

const ScheduleTable219: FC<ScheduleTablePropsType> = (props) => {

    const [schedule, setSchedule] = useState<Array<Schedule219> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            const data = await getSchedule219(props.startDate, props.endDate);
            setSchedule(data);
        };

        fetchSchedule()
            .then(() => {
                setError(null)
            })
            .catch(() => setError('Не удалось получить расписание из диспетчерской'))
            .finally(() => setLoading(false))

    }, [props.startDate, props.endDate])

    const switchByDayNumber = (value: number | undefined): string => {
        switch (value) {
            case 0:
                return 'Понедельник';
            case 1:
                return 'Вторник';
            case 2:
                return 'Среда';
            case 3:
                return 'Четверг';
            case 4:
                return 'Пятница';
            case 5:
                return 'Суббота';
            case 6:
                return 'Воскресенье';
            default:
                return 'Not Found';
        }
    };

    const switchByLessonNumber = (value: number | undefined): string => {
        switch (value) {
            case 1:
                return '08.00-09.35';
            case 2:
                return '09.50-11.25';
            case 3:
                return '11.40-13.15';
            case 4:
                return '14.00-15.35';
            case 5:
                return '15.45-17.20';
            case 6:
                return '17.30-19.05';
            case 7:
                return '19.15-20.50';
            default:
                return 'Not Found';
        }
    };

    const mergeDayOfWeekRowsNumber = (schedule: Array<Schedule219>, day: number) => {
        let count = 0
        schedule.forEach(value => {
            if (value?.day === day)
                count++
        })
        return count
    }

    return (
        <>
            {loading && <Preloader/>}
            {!loading && error &&
                <h2 style={{color: 'red', textAlign: 'center', height: '100vh', alignContent: 'center'}}>{error}</h2>}
            {!loading && schedule && <div className={styles.main__table_schedule_container}>
                <div
                    className={schedule && schedule.length === 0 ? '' : styles.table_schedule_container__table_header_container}
                    id="table-header-container">
                    <table className={styles.table_header_container__table_header}>
                        <thead className={styles.table_header__header}>
                        <tr>
                            <th className={styles.tr__day_of_week_td}>День недели</th>
                            <th className={styles.tr__lesson_time_td}>Время занятия</th>
                            <th>Тип</th>
                            <th>Ответственный</th>
                            <th>Комментарий</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className={styles.table_schedule_container__table_body_container} id="table-body-container">
                    {schedule && schedule.length === 0 &&
                        <table className={styles.table_body_container__table_body_no_content}>
                            <tbody className={`${styles.table_body__body} ${styles.table_body__body_no_content}`}>
                            <tr>
                                <td colSpan={6}>
                                    На этой неделе нагрузки на 219 аудиторию нет!
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    }
                    {schedule && schedule.length > 0 &&
                        <table className={styles.table_body_container__table_body_margin_bottom} id="schedule-table">
                            <tbody className={styles.table_body__body}>
                            {schedule.map((value, index, array) => {
                                    return (
                                        <tr key={value.id}>{index > 0 && array[index]?.day === array[index - 1]?.day ? null :
                                            <td rowSpan={mergeDayOfWeekRowsNumber(schedule, value.day)}
                                                className={styles.tr__day_of_week_td}>{`${switchByDayNumber(value?.day)}`}</td>}
                                            <td className={styles.tr__lesson_time_td}>{value.time}</td>
                                            <td>{value.type}</td>
                                            <td>{value.responsible}</td>
                                            <td>{value.description}</td>
                                            <td>
                                                <div className={styles.button}>
                                                    <NavLink className={styles.button__link} to={`/schedule/219/load-info/${value.id}/edit`}>Изменить</NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                            }
                            </tbody>
                        </table>}
                </div>
            </div>}
        </>
    )
}

export default ScheduleTable219;