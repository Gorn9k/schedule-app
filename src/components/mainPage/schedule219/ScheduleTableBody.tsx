import React, {FC, useEffect, useState} from "react";
import styles from "../schedule/scheduleTable/ScheduleTable.module.css";
import {getSchedule, Schedule} from "../../../api/schedule-backend-api";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../schedule/scheduleTable/ScheduleTable";
import Preloader from "../../preloader/Preloader";

type ScheduleTableBodyProps = {
    bodyContainerRef: React.MutableRefObject<HTMLDivElement | null>
    classes: string[] | null
    startDate: string
    endDate: string
    frame: string
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const ScheduleTableBody: FC<ScheduleTableBodyProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    console.log('ScheduleBody render')

    const fetchSchedule = async () => {
        setLoading(true);
        const data = await getSchedule(props.startDate, props.endDate, props.frame);
        setSchedule(data);
    };

    useEffect(() => {
        fetchSchedule()
            .then(() => {
                props.setError(null)
            })
            .catch(() => props.setError('Не удалось получить расписание из диспетчерской'))
            .finally(() => {
                setLoading(false)
            })
    }, [props.startDate, props.endDate]);

    return <>
        {loading && <Preloader/>}
        {!loading && schedule
            && <div ref={props.bodyContainerRef}
                    className={`${styles.scheduleContainerBody}${(Object.keys(schedule).length === 0
                        && ` ${styles.scheduleContainerBodyNoContent}`) || ''}`} id="table-body-container">
                {Object.keys(schedule).length === 0 &&
                    <table className={styles.scheduleTableBodyNoContent}>
                        <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>
                        <tr>
                            <td colSpan={props.classes && props.classes.length ? props.classes.length + 2 : 4}>
                                На этой неделе нету пар!
                                На этой неделе нету пар!
                                На этой неделе нету пар!
                                На этой неделе нету пар!
                                На этой неделе нету пар!
                                На этой неделе нету пар!
                                На этой неделе нету пар!
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
                                <tr className={((parseKey(dayAndLessonNumber)?.day || 0) % 2 !== 0 && styles.oddRow) || undefined}
                                    key={dayAndLessonNumber}>
                                    {index > 0 && parseKey(array[index])?.day === parseKey(array[index - 1])?.day ? null :
                                        <td rowSpan={mergeDayOfWeekRowsNumber(schedule, dayAndLessonNumber)}
                                            className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(parseKey(dayAndLessonNumber)?.day)}`}</td>}
                                    <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(parseKey(dayAndLessonNumber)?.lessonNumber)}`}</td>
                                    {props.classes?.map(classNumber => {
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
            </div>}
    </>
}