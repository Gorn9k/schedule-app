import React, {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from './/ScheduleTableContainer.module.css'
import {getSchedule, getSchedule219, Schedule, Schedule219} from "../../../../api/schedule-backend-api";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {getUniqueSortedRoomNumbers} from "../../../../utils/dates";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {ScheduleTableBodyLoadsInfo} from "./scheduleTableBodyLoadsInfo/ScheduleTableBodyLoadsInfo";

type ScheduleTableContainerProps = {
    startDate: Date
    endDate: Date
    frame: 'FIRST' | 'FOURTH' | null
}

export const ScheduleTableContainer: FC<ScheduleTableContainerProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | Schedule219 | null>(null);
    const [noContentMessage, setNoContentMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)

    const prevPropsRef = useRef(props);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);

    const fetchSchedule = async () => {
        const requestId = ++requestIdRef.current;
        const data = await ((props.frame &&
                getSchedule(props.startDate.toLocaleDateString('en-CA'),
                    props.endDate.toLocaleDateString('en-CA'),
                    props.frame))
            || getSchedule219(props.startDate.toLocaleDateString('en-CA'),
                props.endDate.toLocaleDateString('en-CA')))
        if (requestId === requestIdRef.current) {
            setSchedule(data as Schedule | Schedule219);
            return data
        }
    }

    useEffect(() => {
        fetchSchedule()
            .then((data) => {
                Object.keys(data as Schedule | Schedule219).length > 0
                && setNoContentMessage('На этой неделе расписания нет.')
            })
            .catch(() => {
                setErrorMessage('Не удалось получить расписание из диспетчерской.')
            })
            .finally(() => {
                prevPropsRef.current = props
            })
    }, [props]);

    useLayoutEffect(() => {
        const handleOverflowCheck = () => {
            if (bodyContainerRef.current) {
                const isOverflowing = bodyContainerRef.current.scrollHeight > bodyContainerRef.current.clientHeight;
                setIsOverflowing(isOverflowing)
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
    }, [props, schedule]);

    return <>
        <table className={styles.scheduleTableHeader}>
            <thead className={styles.scheduleHeader}>
            {
                (props.frame && <ScheduleTableHeaderClassSchedule
                    isLoading={!(schedule && prevPropsRef.current === props)}
                    classes={(schedule && getUniqueSortedRoomNumbers(schedule as Schedule)) || null}/>)
                || <ScheduleTableHeaderLoadsInfo/>
            }
            </thead>
        </table>
        <div ref={bodyContainerRef} className={styles.scheduleContainerBody}>
            <table className={styles.scheduleTableBodyNoContent}>
                <tbody className={`${styles.scheduleBody} ${styles.scheduleBodyNoContent}`}>
                {
                    (props.frame && <ScheduleTableBodyClassesSchedule
                        classes={(schedule && getUniqueSortedRoomNumbers(schedule as Schedule)) || null}
                        schedule={schedule as Schedule | null}
                        isLoading={!(schedule && prevPropsRef.current === props)}/>)
                    || <ScheduleTableBodyLoadsInfo schedule={schedule as Schedule219[] | null}/>
                }
                </tbody>
            </table>
        </div>
    </>
}