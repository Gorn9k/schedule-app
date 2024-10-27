import React, {FC, useLayoutEffect, useRef} from "react";
import styles from "./ScheduleTableContainer.module.css";
import {ScheduleTableHeaderContainer} from "./scheduleTableHeaderContainer/ScheduleTableHeaderContainer";
import {FrameType} from "../../../../../redux/scheduleSlice";
import {withFrame} from "../../../../../hocs/withFrame";
import {
    ScheduleTableBodyClassesScheduleContainer
} from "./scheduleTableBodyClassesScheduleContainer/ScheduleTableBodyClassesScheduleContainer";
import {
    ScheduleTableBodyLoadsInfoContainer
} from "./scheduleTableBodyLoadsInfoContainer/ScheduleTableBodyLoadsInfoContainer";

export const ScheduleTableContainer: FC = () => {

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

            //handleOverflowCheck();

            return () => {
                resizeObserver.unobserve(currentRef);
                resizeObserver.disconnect();
            };
        }
    }, []);

    const ScheduleTableBody: FC<{ frame: FrameType }> = ({frame}) => {

        return (frame && <ScheduleTableBodyClassesScheduleContainer frame={frame}/>)
            || <ScheduleTableBodyLoadsInfoContainer/>
    }

    const EnhancedScheduleTableHeader = withFrame(ScheduleTableBody)

    return <>
        <ScheduleTableHeaderContainer/>
        <div ref={bodyContainerRef}
             className={styles.scheduleContainerBody}>
            <table>
                <tbody>
                {
                    <EnhancedScheduleTableHeader/>
                }
                </tbody>
            </table>
        </div>
    </>
}