import React, {FC} from "react";
import styles from "../../ScheduleTableContainer.module.css";
import {Lesson, Schedule} from "../../../../../../../api/schedule-backend-api";
import {switchByDayNumber, switchByLessonNumber} from "../../../../../../../utils/dates";

type ScheduleTableBodyClassScheduleNotEmptyProps = {
    schedule: Schedule
}

type TableDay = {
    day: number
    rowSpan: number
}

export const ScheduleTableBodyClassesSchedule: FC<ScheduleTableBodyClassScheduleNotEmptyProps> = (props) => {

    const tableDays: TableDay[] = []

    const lessons: Lesson[] = []

    props.schedule.days.forEach(day => {
        const result = props.schedule.schedules.filter(lesson => lesson.day === day)
            .reduce((accumulator, currentValue) => {
                if (accumulator.some(lesson => lesson.day === currentValue.day && lesson.lessonNumber === currentValue.lessonNumber))
                    return accumulator;
                accumulator.push(currentValue)
                return accumulator
            }, [] as Lesson[])
        tableDays.push(
            {
                day: day, rowSpan: result.length
            }
        )
        lessons.push(...result)
    })

    return <>
        {
            lessons.map(lesson => {
                return (
                    <tr className={(lesson.day % 2 !== 0 && styles.oddRow) || undefined}
                        key={lesson.id}>
                        {!tableDays.find(value => value.day === lesson.day) ? null :
                            <td rowSpan={tableDays.shift()?.rowSpan}
                                className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(lesson.day)}`}</td>}
                        <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(lesson.lessonNumber)}`}</td>
                        {props.schedule.classesNumbers.map(classNumber => {
                            const cellContent = props.schedule.schedules.filter(value => value.roomNumber === classNumber && value.day === lesson.day &&
                                value.lessonNumber === lesson.lessonNumber).map((value, lessonIndex) => {
                                    return (
                                        <ul key={value.id}
                                            className={`${styles.lessonContent}${lessonIndex > 0 ? ` ${styles.lessonContentFlex}` : ''}`}>
                                            <li>{`${value.disciplineName}`}</li>
                                            <li>{`${value.teacherFullName}`}</li>
                                            <li>{`${value.group}`}</li>
                                        </ul>
                                    )
                                }
                            )
                            return (
                                <td key={classNumber} className={styles.tdLesson}>
                                    {cellContent}
                                </td>
                            )
                        })
                        }
                    </tr>
                )
            })
        }
    </>
}