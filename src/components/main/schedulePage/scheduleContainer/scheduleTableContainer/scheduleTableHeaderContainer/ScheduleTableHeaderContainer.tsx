import React, {FC} from "react";
import styles from "../ScheduleTableContainer.module.css";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {withFrame} from "../../../../../../hocs/withFrame";
import {FrameType} from "../../../../../../redux/scheduleSlice";
import {
    ScheduleTableHeaderClassScheduleContainer
} from "./scheduleTableHeaderClassScheduleContainer/ScheduleTableHeaderClassScheduleContainer";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

export const ScheduleTableHeaderContainer: FC = () => {

    const isOverflowing = useSelector((state: RootState) => state.schedule.isOverflowing)

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