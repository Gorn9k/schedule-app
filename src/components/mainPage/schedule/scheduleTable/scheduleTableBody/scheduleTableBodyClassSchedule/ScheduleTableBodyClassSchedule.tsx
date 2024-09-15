import React, {FC} from "react";
import styles from "../../ScheduleTable.module.css";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../../ScheduleTable";

type ScheduleTableBodyClassScheduleProps = {}

export const ScheduleTableBodyClassSchedule: FC<ScheduleTableBodyClassScheduleProps> = () => {

    return <>
        (Object.keys(schedule).length === 0 &&
        ||
        (Object.keys(schedule).length > 0) &&
        (

        ))
    </>
}