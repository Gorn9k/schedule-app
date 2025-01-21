import React, {FC, memo, useEffect, useRef} from "react";
import styles from "../../ScheduleTableContainer.module.css";
import {Lesson} from "../../../../../../../api/schedule-backend-api";
import {switchByDayNumber, switchByLessonNumber} from "../../../../../../../utils/dates";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";

type ScheduleTableBodyClassScheduleNotEmptyProps = {
    lessons: Lesson[]
    days: number[]
    classesNumbers: string[]
}

type TableDay = {
    day: number
    rowSpan: number
}

export const ScheduleTableBodyClassesSchedule: FC<ScheduleTableBodyClassScheduleNotEmptyProps> = memo(({
                                                                                                           lessons,
                                                                                                           classesNumbers,
                                                                                                           days
                                                                                                       }) => {

    const currentRow = useRef<HTMLTableCellElement>(null);

    const isOverflowing = useSelector((state: RootState) => state.schedule.isOverflowing)

    const tableDays: TableDay[] = []

    const tableLessons: Lesson[] = []

    days.forEach(day => {
        const result = lessons.filter(lesson => lesson.day === day)
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
        tableLessons.push(...result)
    })

    let currentDay = 1;
    let styleFlag = false;

    useEffect(() => {
        if (currentRow.current && isOverflowing) {

            const cellRect = currentRow.current.getBoundingClientRect();
            const table = currentRow.current.closest('table');

            if (table) {
                const tableRect = table.getBoundingClientRect();
                let distance = cellRect.top - tableRect.top;
                table.parentElement?.scroll({top: distance, behavior: "smooth"})
            }
        }
    }, [currentRow, isOverflowing]);

    return <>
        {
            tableLessons.map((lesson) => {

                if (currentDay !== lesson.day) {
                    currentDay = lesson.day;
                    styleFlag = !styleFlag;
                }

                return (
                    <tr className={(!styleFlag && styles.oddRow) || undefined}
                        key={lesson.id}>
                        {!tableDays.find(value => value.day === lesson.day) ? null :
                            <td rowSpan={tableDays.shift()?.rowSpan}
                                ref={(new Date().getDay() + 6 === lesson.day || (new Date().getDay() - 1) === lesson.day) ? currentRow : null}
                                className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(lesson.day)}`}</td>}
                        <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(lesson.lessonNumber)}`}</td>
                        {classesNumbers.map(classNumber => {
                            const cellContent = lessons.filter(value => value.roomNumber === classNumber && value.day === lesson.day &&
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
})