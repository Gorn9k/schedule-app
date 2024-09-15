import React, {FC} from "react";
import styles from "../../../ScheduleTable.module.css";

type ScheduleTableBodyClassScheduleEmptyProps = {}

export const ScheduleTableBodyClassScheduleEmpty: FC<ScheduleTableBodyClassScheduleEmptyProps> = () => {

    return (
        <tr>
            <td>
                На этой неделе нету пар!
            </td>
        </tr>
    )
}