import React, {FC, useEffect, useRef, useState} from 'react'
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
    const [isOverflowing, setIsOverflowing] = useState(false);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const headerContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkOverflow = () => {
            const bodyContainer = bodyContainerRef.current;
            const headerContainer = headerContainerRef.current;
            if (bodyContainer && headerContainer) {
                if (bodyContainer.scrollHeight > bodyContainer.clientHeight)
                    setIsOverflowing(true)
                else
                    setIsOverflowing(false)
            }
        };

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
            .finally(() => {
                setLoading(false)
                setTimeout(checkOverflow)
            })

        window.addEventListener('resize', checkOverflow)

        return () => {
            window.removeEventListener('resize', checkOverflow)
        }
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
            {!loading && error &&
                <h2 style={{color: 'red', textAlign: 'center', height: '100vh', alignContent: 'center'}}>{error}</h2>}
            {!loading && schedule && <div className={styles.scheduleContainer}>
                <div ref={headerContainerRef} className={(isOverflowing && `${styles.scheduleContainerHeader}`) || undefined} id="table-header-container">
                    <table className={styles.scheduleTableHeader}>
                        <thead className={styles.scheduleHeader}>
                        <tr>
                            <th rowSpan={2} className={styles.thAndTdDayAndTime}>День недели</th>
                            <th rowSpan={2} className={styles.thAndTdDayAndTime}>Время занятия</th>
                            <th colSpan={classes && classes.length > 0 ? classes.length : undefined}>Номер аудитории
                            </th>
                        </tr>
                        {classes && classes.length > 0 ?
                            <tr>
                                {classes?.map(value => <th key={value}>{value}</th>)}
                            </tr> : null
                        }
                        </thead>
                    </table>
                </div>
                <div ref={bodyContainerRef} className={`${styles.scheduleContainerBody}${(Object.keys(schedule).length === 0 
                    && ` ${styles.scheduleContainerBodyNoContent}`) || ''}`} id="table-body-container">
                    {Object.keys(schedule).length === 0 &&
                        <table className={styles.scheduleTableBodyNoContent}>
                            <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>
                            <tr>
                                <td colSpan={classes && classes.length ? classes.length + 2 : 4}>
                                    На этой неделе нету пар!
                                </td>
                            </tr>
                            </tbody>
                        </table>}
                    {Object.keys(schedule).length > 0 &&
                        <table className={styles.scheduleTableBodyContent} id="schedule-table">
                            <tbody className={styles.scheduleBody}>
                            {Object.keys(schedule).map((dayAndLessonNumber, index, array) => {
                                return (
                                    <tr className={((parseKey(dayAndLessonNumber)?.day || 0) % 2 !== 0 && styles.oddRow) || undefined} key={dayAndLessonNumber}>
                                        {index > 0 && parseKey(array[index])?.day === parseKey(array[index - 1])?.day ? null :
                                            <td rowSpan={mergeDayOfWeekRowsNumber(schedule, dayAndLessonNumber)}
                                                className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(parseKey(dayAndLessonNumber)?.day)}`}</td>}
                                        <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(parseKey(dayAndLessonNumber)?.lessonNumber)}`}</td>
                                        {classes?.map(classNumber => {
                                            return (
                                                <td key={classNumber} className={styles.tdLesson}>
                                                    {findLessonsByRoomNumber(schedule, classNumber, dayAndLessonNumber).map((value, index) => {
                                                            if (index > 0) {
                                                                return (
                                                                    <div key={value.id}
                                                                         className={styles.lessonContentFlex}>
                                                                        <label>{`${value.disciplineName}`}</label><br/>
                                                                        <label>{`${value.teacherFullName}`}</label><br/>
                                                                        <label>{`${value.group}`}</label><br/>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div key={value.id}
                                                                         className={styles.lessonContentMono}>
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