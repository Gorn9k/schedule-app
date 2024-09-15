import React, {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "../ScheduleTable.module.css";
import {getSchedule, Schedule} from "../../../../../api/schedule-backend-api";
import {
    findLessonsByRoomNumber,
    mergeDayOfWeekRowsNumber,
    parseKey,
    switchByDayNumber,
    switchByLessonNumber
} from "../ScheduleTable";
import Preloader from "../../../../preloader/Preloader";
import {setError} from "../../../../../redux/connectionErrorMessageSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";
import {prev} from "../../../../../redux/currentWeekPeriodSlice";
import {setOverflowing} from "../../../../../redux/overflowTableBodySlice";

type ScheduleTableBodyProps = {
    classes: string[] | null
    startDate: string
    endDate: string
    frame: string
}

export const ScheduleTableBody: FC<ScheduleTableBodyProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const prevPropsRef = useRef(props);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const requestIdRef = useRef(0);

    console.log(`ScheduleBody render`)

    useEffect(() => {
        prevPropsRef.current = props;
    }, [props]);

    useLayoutEffect(() => {
        const handleOverflowCheck = () => {
            if (bodyContainerRef.current) {
                const isOverflowing = bodyContainerRef.current.scrollHeight > bodyContainerRef.current.clientHeight;
                dispatch(setOverflowing({isOverflowing}))
            }
        };

        const resizeObserver = new ResizeObserver(handleOverflowCheck);
        if (bodyContainerRef.current) {
            resizeObserver.observe(bodyContainerRef.current);
        }

        return () => {
            if (bodyContainerRef.current) {
                resizeObserver.unobserve(bodyContainerRef.current);
            }
            resizeObserver.disconnect();
        };
    }, [props.startDate, schedule]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const requestId = ++requestIdRef.current;
            const data = await getSchedule(props.startDate, props.endDate, props.frame);
            if (requestId === requestIdRef.current)
                setSchedule(data);
        };
        fetchSchedule()
            .catch(() => dispatch(setError({error: 'Не удалось получить расписание из диспетчерской'})))
        return () => {
            console.log("ScheduleBody unmounted");
        };
    }, [dispatch, props.startDate]);

    return (
        <table className={styles.scheduleTableBodyNoContent}>
            <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>

            </tbody>
        </table>
    )
}