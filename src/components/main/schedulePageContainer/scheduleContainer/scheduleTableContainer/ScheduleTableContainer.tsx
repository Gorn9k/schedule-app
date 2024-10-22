import React, {FC, useLayoutEffect, useRef, useState} from "react";
import {Schedule, Schedule219} from "../../../../../api/schedule-backend-api";
import styles from "./ScheduleTableContainer.module.css";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {ScheduleTableBodyLoadsInfo} from "./scheduleTableBodyLoadsInfo/ScheduleTableBodyLoadsInfo";
import {FrameType} from "../../../../../redux/scheduleSlice";

type ScheduleTableContainerProps = {
    schedule: Schedule | Schedule219[]
    frame?: FrameType
}

export const ScheduleTableContainer: FC<ScheduleTableContainerProps> = ({schedule, frame}) => {

    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const currentRef = bodyContainerRef.current

        if (currentRef) {
            const handleOverflowCheck = () => {
                const isOverflowing = currentRef.scrollHeight > currentRef.clientHeight;
                setIsOverflowing(isOverflowing)
            };

            const resizeObserver = new ResizeObserver(handleOverflowCheck);

            resizeObserver.observe(currentRef);

            handleOverflowCheck();

            return () => {
                resizeObserver.unobserve(currentRef);
                resizeObserver.disconnect();
            };
        }
    }, [schedule]);

    return <>
        <table
            className={`${styles.scheduleTableHeader}${(isOverflowing && ` ${styles.scheduleTableHeaderScroll}`) || ''}`}>
            <thead className={styles.scheduleHeader}>
            {
                (frame && <ScheduleTableHeaderClassSchedule
                    classes={(schedule as Schedule).classesNumbers}/>)
                || <ScheduleTableHeaderLoadsInfo/>
            }
            </thead>
        </table>
        <div ref={bodyContainerRef}
             className={styles.scheduleContainerBody}>
            <table>
                <tbody>
                {
                    (frame && <ScheduleTableBodyClassesSchedule
                        schedule={schedule as Schedule}/>)
                    || <ScheduleTableBodyLoadsInfo schedule={schedule as Schedule219[]}/>
                }
                </tbody>
            </table>
        </div>
    </>
}