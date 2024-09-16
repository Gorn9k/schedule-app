import React, {FC, useEffect} from "react";
import styles from "../ScheduleTable.module.css";
import stylesFromScheduleTable from "../ScheduleTable.module.css";
import stylesFromSchedule from "../../Schedule.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {ScheduleTableBody} from "../scheduleTableBody/ScheduleTableBody";

type ScheduleTableHeaderPropsType = {
    classes: string[]
    frame: string | null
}

export const ScheduleTableHeader: FC<ScheduleTableHeaderPropsType> = (props) => {

    const isOverflowing = useSelector((state: RootState) => state.overflowTableBody.isOverflowing)

    console.log(`ScheduleHeader render`)

    useEffect(() => {
        return () => {
            console.log("ScheduleHeader unmounted");
        }
    }, [])

    return (
        <table className={styles.scheduleTableHeader}>
            <thead className={styles.scheduleHeader}>
                <ScheduleTableHeaderClassSchedule classes={props.classes}/>
                <ScheduleTableHeaderLoadsInfo/>
            </thead>
        </table>
    )
}