import React, {FC} from "react";
import styles from "../../../ScheduleTable.module.css";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../../../ScheduleTable";
import {Schedule} from "../../../../../../../api/schedule-backend-api";

type ScheduleTableBodyClassScheduleNotEmptyProps = {
    schedule: Schedule | null
    classes: string[]
}

export const ScheduleTableBodyClassScheduleNotEmpty: FC<ScheduleTableBodyClassScheduleNotEmptyProps> = (props) => {

    return (<>
            {/*{(props.schedule && Object.keys(props.schedule).map((dayAndLessonNumber, index, array) => {*/}
            {/*    return (*/}
            {/*        <tr className={((parseKey(dayAndLessonNumber)?.day || 0) % 2 !== 0 && styles.oddRow) || undefined}*/}
            {/*            key={dayAndLessonNumber}>*/}
            {/*            {index > 0 && parseKey(array[index])?.day === parseKey(array[index - 1])?.day ? null :*/}
            {/*                <td rowSpan={mergeDayOfWeekRowsNumber(props.schedule, dayAndLessonNumber)}*/}
            {/*                    className={styles.thAndTdDayAndTime}>{`${switchByDayNumber(parseKey(dayAndLessonNumber)?.day)}`}</td>}*/}
            {/*            <td className={styles.thAndTdDayAndTime}>{`${switchByLessonNumber(parseKey(dayAndLessonNumber)?.lessonNumber)}`}</td>*/}
            {/*            {props.classes?.map(classNumber => {*/}
            {/*                return (*/}
            {/*                    <td key={classNumber} className={styles.tdLesson}>*/}
            {/*                        {findLessonsByRoomNumber(props.schedule, classNumber, dayAndLessonNumber).map((value, index) => {*/}
            {/*                                if (index > 0) {*/}
            {/*                                    return (*/}
            {/*                                        <div key={value.id}*/}
            {/*                                             className={styles.lessonContentFlex}>*/}
            {/*                                            <label>{`${value.disciplineName}`}</label><br/>*/}
            {/*                                            <label>{`${value.teacherFullName}`}</label><br/>*/}
            {/*                                            <label>{`${value.group}`}</label><br/>*/}
            {/*                                        </div>*/}
            {/*                                    )*/}
            {/*                                } else {*/}
            {/*                                    return (*/}
            {/*                                        <div key={value.id}*/}
            {/*                                             className={styles.lessonContentMono}>*/}
            {/*                                            <label>{`${value.disciplineName}`}</label><br/>*/}
            {/*                                            <label>{`${value.teacherFullName}`}</label><br/>*/}
            {/*                                            <label>{`${value.group}`}</label><br/>*/}
            {/*                                        </div>*/}
            {/*                                    )*/}
            {/*                                }*/}
            {/*                            }*/}
            {/*                        )*/}
            {/*                        }*/}
            {/*                    </td>*/}
            {/*                )*/}
            {/*            })*/}
            {/*            }*/}
            {/*        </tr>*/}
            {/*    )*/}
            {/*}))}*/}
        </> || null

    )
}