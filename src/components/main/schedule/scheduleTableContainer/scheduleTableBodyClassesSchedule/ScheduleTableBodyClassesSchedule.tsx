import React, {FC} from "react";
import styles from "../ScheduleTableContainer.module.css";
import {Schedule} from "../../../../../api/schedule-backend-api";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../../../../../utils/dates";


type ScheduleTableBodyClassScheduleNotEmptyProps = {
    schedule: Schedule
}

export const ScheduleTableBodyClassesSchedule: FC<ScheduleTableBodyClassScheduleNotEmptyProps> = (props) => {

    return <>
        {
            props.schedule.days.map((day, index, array) => {
                props.schedule.lessonsNumbers.map((lessonNumber) => {
                    return (
                        <tr className={(day % 2 !== 0 && styles.oddRow) || undefined}
                            key={`${day}${lessonNumber}`}>
                            {index > 0 && array[index] === array[index - 1] ? null :
                                <td rowSpan={mergeDayOfWeekRowsNumber(props.schedule.schedules, day)}
                                    className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(parseKey(dayAndLessonNumber)?.day)}`}</td>}
                            <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(parseKey(dayAndLessonNumber)?.lessonNumber)}`}</td>
                            {props.classes?.map(classNumber => {
                                return (
                                    <td key={classNumber} className={styles.tdLesson}>
                                        {findLessonsByRoomNumber(props.schedule as Schedule, classNumber, dayAndLessonNumber).map((value, index) => {
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
                }))
                })

        }
    </>
}