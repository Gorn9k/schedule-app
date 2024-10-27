import React, {FC, useState} from "react";
import styles from "../ScheduleTableContainer.module.css";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {withFrame} from "../../../../../../hocs/withFrame";
import {FrameType} from "../../../../../../redux/scheduleSlice";
import {
    ScheduleTableHeaderClassScheduleContainer
} from "./scheduleTableHeaderClassScheduleContainer/ScheduleTableHeaderClassScheduleContainer";

export const ScheduleTableHeaderContainer: FC = () => {

    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

    const ScheduleTableHeader: FC<{ frame: FrameType }> = ({frame}) => {

        return (frame && <ScheduleTableHeaderClassScheduleContainer frame={frame}/>)
            || <ScheduleTableHeaderLoadsInfo/>
    }

    const EnhancedScheduleTableHeader = withFrame(ScheduleTableHeader)

    return <table
        className={`${styles.scheduleTableHeader}${(isOverflowing && ` ${styles.scheduleTableHeaderScroll}`) || ''}`}>
        <thead className={styles.scheduleHeader}>
        {
            <EnhancedScheduleTableHeader/>
        }
        </thead>
    </table>
}