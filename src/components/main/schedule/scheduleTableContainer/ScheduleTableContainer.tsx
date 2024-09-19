import React, {FC, useEffect, useReducer, useRef, useState} from "react";
import stylesFromSchedule from "*.module.css";
import styles from "./scheduleTable/ScheduleTable.module.css";
import {Link} from "react-router-dom";
import {ScheduleTableHeader} from "./scheduleTable/scheduleTableHeader/ScheduleTableHeader";
import {ScheduleTableBody} from "./scheduleTable/scheduleTableBody/ScheduleTableBody";
import {
    ScheduleTableHeaderClassSchedule
} from "./scheduleTable/scheduleTableHeader/scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {
    ScheduleTableHeaderLoadsInfo
} from "./scheduleTable/scheduleTableHeader/scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {getSchedule} from "../../../../api/schedule-backend-api";

type ScheduleTableContainerProps = {
    startDate: Date
    endDate: Date
    frame: 'FIRST' | 'FOURTH' | null
}

export const ScheduleTableContainer: FC<ScheduleTableContainerProps> = (props) => {

    const [noContentMessage, setNoContentMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

    const prevPropsRef = useRef(props);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);

    return <>
        <table className={styles.scheduleTableHeader}>
            <thead className={styles.scheduleHeader}>
            {
                (props.frame && <ScheduleTableHeaderClassSchedule/>) || <ScheduleTableHeaderLoadsInfo/>
            }
            </thead>
        </table>
        <ScheduleTableHeader>
            {

            }
        </ScheduleTableHeader>
        <div ref={bodyContainerRef} className={styles.scheduleContainerBody}>
            <table className={styles.scheduleTableBodyNoContent}>
                <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>
                <ScheduleTableBody classes={classes}
                                   startDate={props.startDate}
                                   endDate={props.endDate}
                                   frame={props.frame}/>
                </tbody>
            </table>
        </div>
    </>
}