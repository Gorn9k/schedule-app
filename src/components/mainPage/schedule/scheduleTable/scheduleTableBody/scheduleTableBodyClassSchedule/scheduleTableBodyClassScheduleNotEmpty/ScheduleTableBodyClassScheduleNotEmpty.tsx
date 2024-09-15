import React, {FC} from "react";
import styles from "../../../ScheduleTable.module.css";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../../../ScheduleTable";

type ScheduleTableBodyClassScheduleNotEmptyProps = {

}

export const ScheduleTableBodyClassScheduleNotEmpty: FC<ScheduleTableBodyClassScheduleNotEmptyProps> = () => {

    return (
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
    )
}