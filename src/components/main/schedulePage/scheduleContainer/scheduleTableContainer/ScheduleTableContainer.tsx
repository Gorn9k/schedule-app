import React, {FC, useLayoutEffect, useRef} from "react";
import styles from "./ScheduleTableContainer.module.css";
import {ScheduleTableHeaderContainer} from "./scheduleTableHeaderContainer/ScheduleTableHeaderContainer";
import {FrameType, setIsOverflowing} from "../../../../../redux/scheduleSlice";
import {withFrame} from "../../../../../hocs/withFrame";
import {
    ScheduleTableBodyClassesScheduleContainer
} from "./scheduleTableBodyClassesScheduleContainer/ScheduleTableBodyClassesScheduleContainer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../../redux/store";
import {ScheduleTableBodyLoadsInfo} from "./scheduleTableBodyLoadsInfo/ScheduleTableBodyLoadsInfo";
import {Lesson, LoadInfo} from "../../../../../api/schedule-backend-api";

export const ScheduleTableContainer: FC = () => {

    const bodyContainerRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch<AppDispatch>()

    useLayoutEffect(() => {
        const currentRef = bodyContainerRef.current;

        if (currentRef) {
            const handleOverflowCheck = () => {
                requestAnimationFrame(() => {
                    const isOverflowing = currentRef.scrollHeight > currentRef.clientHeight;
                    dispatch(setIsOverflowing(isOverflowing));
                });
            };

            const resizeObserver = new ResizeObserver(handleOverflowCheck);

            resizeObserver.observe(currentRef);

            handleOverflowCheck();

            return () => {
                resizeObserver.unobserve(currentRef);
                resizeObserver.disconnect();
            };
        }
    }, [dispatch]);

    const ScheduleTable: FC<{ frame: FrameType }> = ({frame}) => {

        const schedule = useSelector((state: RootState) => frame ?
            state.schedule.lessons : state.schedule.loadsInfo)

        const NoContent: FC = () => {
            return <tr>
                <td style={{background: '#EFEFEF'}}>
                    <h2 style={{
                        textAlign: 'center',
                        alignContent: 'center'
                    }}>{'На этой неделе расписания нет'}</h2>
                </td>
            </tr>
        }

        return <table className={schedule && schedule.length > 0 ? undefined : styles.scheduleTableNoContent}>
            <tbody>
            {
                schedule && schedule.length > 0 ?
                    (frame && <ScheduleTableBodyClassesScheduleContainer lessons={schedule as Lesson[]}/>)
                    || <ScheduleTableBodyLoadsInfo loadsInfo={schedule as LoadInfo[]}/> : <NoContent/>
            }
            </tbody>
        </table>
    }

    const EnhancedScheduleTable = withFrame(ScheduleTable)

    return <>
        <ScheduleTableHeaderContainer/>
        <div ref={bodyContainerRef}
             className={styles.scheduleContainerBody}>
            <EnhancedScheduleTable/>
        </div>
    </>
}