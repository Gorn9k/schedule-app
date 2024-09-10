import React, {FC, useEffect, useState} from 'react'
import {DayAndLessonNumber, getSchedule, Lesson, Schedule} from "../../../../api/schedule-backend-api";
import styles from './ScheduleTable.module.css'
import Preloader from "../../../preloader/Preloader";

type ScheduleTablePropsType = {
    startDate: string
    endDate: string
    frame: string
}

const ScheduleTable: FC<ScheduleTablePropsType> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            const data = await getSchedule(props.startDate, props.endDate, props.frame);
            setSchedule(data);
        };

        fetchSchedule()
            .then(() => {
                setError(null)
            })
            .catch(() => setError('Не удалось получить расписание из диспетчерской'))
            .finally(() => setLoading(false))

    }, [props.startDate, props.endDate, props.frame])

    const getUniqueSortedRoomNumbers = (schedule: Schedule): string[] => {
        const roomNumbersSet = new Set<string>();

        for (const dayLesson in schedule) {
            if (schedule.hasOwnProperty(dayLesson)) {
                const daySchedule = schedule[dayLesson];

                for (const room in daySchedule) {
                    if (daySchedule.hasOwnProperty(room)) {
                        roomNumbersSet.add(room);
                    }
                }
            }
        }

        const roomNumbersArray = Array.from(roomNumbersSet);
        roomNumbersArray.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

        return roomNumbersArray;
    }

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

    const findLessonsByRoomNumber = (schedule: Schedule, roomNumber: string, day: string) => {
        const results: Lesson[] = [];

        for (const dayLesson in schedule) {
            if (schedule.hasOwnProperty(dayLesson) && dayLesson === day) {
                const daySchedule = schedule[dayLesson];

                for (const room in daySchedule) {
                    if (daySchedule.hasOwnProperty(room) && room === roomNumber) {
                        results.push(...daySchedule[room]);
                    }
                }
            }
        }

        return results;
    };

    const mergeDayOfWeekRowsNumber = (schedule: Schedule, dayAndLessonNumber: string) => {
        let count = 0
        for (const dayLesson in schedule) {
            if (parseKey(dayLesson)?.day === parseKey(dayAndLessonNumber)?.day)
                count++
        }
        return count
    }

    const classes = schedule && getUniqueSortedRoomNumbers(schedule);

    const parseKey = (key: string): DayAndLessonNumber | null => {
        try {
            return JSON.parse(key) as DayAndLessonNumber;
        } catch (e) {
            console.error("Error parsing key:", e);
            return null;
        }
    }

    return (
        <>
            {loading && <Preloader/>}
            {!loading && error && <h2 style={{ color: 'red', textAlign: 'center', height: '100vh', alignContent: 'center' }}>{error}</h2>}
            {!loading && schedule && <div className={styles.main__table_schedule_container}>
                <div
                    className={`${styles.table_schedule_container__table_header_container_margin} ${schedule && Object.keys(schedule).length === 0 ? '' : 
                        styles.table_schedule_container__table_header_container}`}
                    id="table-header-container">
                    <table className={styles.table_header_container__table_header}>
                        <thead className={styles.table_header__header}>
                        <tr>
                            <th rowSpan={2} className={styles.tr__day_of_week_td}>День недели</th>
                            <th rowSpan={2} className={styles.tr__lesson_time_td}>Время занятия</th>
                            <th colSpan={classes && classes.length > 0 ? classes.length : undefined}>Номер аудитории</th>
                        </tr>
                        {classes && classes.length > 0 ?
                            <tr>
                                {classes?.map(value => <th key={value}>{value}</th>)}
                            </tr> : null
                        }
                        </thead>
                    </table>
                </div>
                <div className={styles.table_schedule_container__table_body_container} id="table-body-container">
                    {schedule && Object.keys(schedule).length === 0 &&
                        <table className={styles.table_body_container__table_body_no_content}>
                            <tbody className={`${styles.table_body__body} ${styles.table_body__body_no_content}`}>
                            <tr>
                                <td colSpan={classes && classes.length ? classes.length + 2 : 4}>
                                    На этой неделе нету пар!
                                </td>
                            </tr>
                            </tbody>
                        </table>}
                    {schedule && Object.keys(schedule).length > 0 &&
                        <table className={styles.table_body_container__table_body_margin_bottom} id="schedule-table">
                            <tbody className={styles.table_body__body}>
                            {Object.keys(schedule).map((dayAndLessonNumber, index, array) => {
                                return (
                                    <tr key={dayAndLessonNumber}>
                                        {index > 0 && parseKey(array[index])?.day === parseKey(array[index - 1])?.day ? null : <td rowSpan={mergeDayOfWeekRowsNumber(schedule, dayAndLessonNumber)}
                                            className={styles.tr__day_of_week_td}>{`${switchByDayNumber(parseKey(dayAndLessonNumber)?.day)}`}</td>}
                                        <td className={styles.tr__lesson_time_td}>{`${switchByLessonNumber(parseKey(dayAndLessonNumber)?.lessonNumber)}`}</td>
                                        {classes?.map(classNumber => {
                                            return (
                                                <td key={classNumber} className={styles.tr__td_schedule}>
                                                    {findLessonsByRoomNumber(schedule, classNumber, dayAndLessonNumber).map((value, index) => {
                                                            if (index > 0) {
                                                                return (
                                                                    <div key={value.id}
                                                                         className={styles.td_schedule__schedule_content_flex}>
                                                                        <label>{`${value.disciplineName}`}</label><br/>
                                                                        <label>{`${value.teacherFullName}`}</label><br/>
                                                                        <label>{`${value.group}`}</label><br/>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div key={value.id}
                                                                         className={styles.td_schedule__schedule_content_mono}>
                                                                        <label>{`${value.disciplineName}`}</label><br/>
                                                                        <label>{`${value.teacherFullName}`}</label><br/>
                                                                        <label>{`${value.group}`}</label><br/>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                    )
                                                    }
                                                </td>
                                            )
                                        })
                                        }
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>}
                </div>
            </div>}
        </>
    )
}

export default ScheduleTable;