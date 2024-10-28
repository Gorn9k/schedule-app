import React, {FC, useLayoutEffect, useRef} from "react";
import styles from "./ScheduleTableContainer.module.css";
import {ScheduleTableHeaderContainer} from "./scheduleTableHeaderContainer/ScheduleTableHeaderContainer";
import {FrameType, setIsOverflowing} from "../../../../../redux/scheduleSlice";
import {withFrame} from "../../../../../hocs/withFrame";
import {
    ScheduleTableBodyClassesScheduleContainer
} from "./scheduleTableBodyClassesScheduleContainer/ScheduleTableBodyClassesScheduleContainer";
import {
    ScheduleTableBodyLoadsInfoContainer
} from "./scheduleTableBodyLoadsInfoContainer/ScheduleTableBodyLoadsInfoContainer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";

export const ScheduleTableContainer: FC = () => {

    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    
    const dispatch = useDispatch<AppDispatch>()

    useLayoutEffect(() => {
        const currentRef = bodyContainerRef.current

        if (currentRef) {
            const handleOverflowCheck = () => {
                const isOverflowing = currentRef.scrollHeight > currentRef.clientHeight;
                dispatch(setIsOverflowing(isOverflowing))
            };

            const resizeObserver = new ResizeObserver(handleOverflowCheck);

            resizeObserver.observe(currentRef);

            //handleOverflowCheck();

            return () => {
                resizeObserver.unobserve(currentRef);
                resizeObserver.disconnect();
            };
        }
    }, [dispatch]);

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