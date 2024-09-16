import React, {FC, useState} from 'react'
import {DayAndLessonNumber, Lesson, Schedule} from "../../../../api/schedule-backend-api";
import styles from './ScheduleTable.module.css'
import {ScheduleTableHeader} from "./scheduleTableHeader/ScheduleTableHeader";
import {ScheduleTableBody} from "./scheduleTableBody/ScheduleTableBody";
import {useSelector} from "react-redux";
import Store, {RootState} from "../../../../redux/store";
import stylesFromSchedule from "../Schedule.module.css";
import {Link} from "react-router-dom";

type ScheduleTablePropsType = {
    startDate: string
    endDate: string
    frame: string
}


export const getUniqueSortedRoomNumbers = (schedule: Schedule): string[] => {
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

export const switchByDayNumber = (value: number | undefined): string => {
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

export const switchByLessonNumber = (value: number | undefined): string => {
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

export const findLessonsByRoomNumber = (schedule: Schedule, roomNumber: string, day: string) => {
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

export const mergeDayOfWeekRowsNumber = (schedule: Schedule, dayAndLessonNumber: string) => {
    let count = 0
    for (const dayLesson in schedule) {
        if (parseKey(dayLesson)?.day === parseKey(dayAndLessonNumber)?.day)
            count++
    }
    return count
}

export const parseKey = (key: string): DayAndLessonNumber | null => {
    try {
        return JSON.parse(key) as DayAndLessonNumber;
    } catch (e) {
        console.error("Error parsing key:", e);
        return null;
    }
}

const ScheduleTable: FC<ScheduleTablePropsType> = (props) => {

    const error = useSelector((state: RootState) => state.connectionErrorMessage.error)
    const [classes, setClasses] = useState<string[]>(
        props.frame && props.frame === 'FIRST'
            ? ['122', '212', '221', '417']
            : ['214', '310', '312', '318']
    )

    console.log(`ScheduleTable render`)

    return (error &&
            <h2 style={{color: 'red', textAlign: 'center', height: '100vh', alignContent: 'center'}}>{error}</h2>)
        ||
        <>
            <div className={`${stylesFromSchedule.button} ${styles.buttonAddLoadInfo}`}>
                <Link to={`/loads-info/create`}>Добавить нагрузку</Link>
            </div>
            <ScheduleTableHeader classes={classes} frame={props.frame}/>
            <div className={styles.scheduleContainerBody}>
                <table className={styles.scheduleTableBodyNoContent}>
                    <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>
                        <ScheduleTableBody classes={classes}
                                           startDate={props.startDate}
                                           endDate={props.endDate}
                                           frame={props.frame}/>
                    </tbody>
                </table>
            </div>
        </>
}

export default ScheduleTable;