import React, {FC, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from './/ScheduleTableContainer.module.css'
import stylesFromSchedule from '../Schedule.module.css'
import {getSchedule, getSchedule219, Schedule, Schedule219} from "../../../../api/schedule-backend-api";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {ScheduleTableBodyLoadsInfo} from "./scheduleTableBodyLoadsInfo/ScheduleTableBodyLoadsInfo";
import Preloader from "../../../preloader/Preloader";

type ScheduleTableContainerProps = {
    startDate: Date
    endDate: Date
    frame: 'FIRST' | 'FOURTH' | null
}

export const ScheduleTableContainer: FC<ScheduleTableContainerProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | Schedule219[] | null>(null);
    const [noContentMessage, setNoContentMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);
    
    const fetchData = useCallback(() => {
        const requestId = ++requestIdRef.current;
        const fetchSchedule = async () => {
            setIsLoading(true)
            setNoContentMessage(null)
            setErrorMessage(null)
            return await ((props.frame &&
                    getSchedule(props.startDate.toLocaleDateString('en-CA'),
                        props.endDate.toLocaleDateString('en-CA'),
                        props.frame))
                || getSchedule219(props.startDate.toLocaleDateString('en-CA'),
                    props.endDate.toLocaleDateString('en-CA')))
        }

        if (requestId === requestIdRef.current) {
            fetchSchedule()
                .then((data) => {
                    ((((data as Schedule).schedules && (Object.keys((data as Schedule).schedules).length === 0))
                            || Object.keys(data as Schedule219[]).length === 0)
                        && setNoContentMessage('На этой неделе расписания нет.'))
                    || setSchedule(data as Schedule | Schedule219[]);
                })
                .catch((reason) => {
                    console.log(reason)
                    setErrorMessage('Не удалось получить расписание из диспетчерской.')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [props])

    useEffect(() => {
        fetchData()
    }, [fetchData, props]);

    useLayoutEffect(() => {
        const currentRef = bodyContainerRef.current

        const handleOverflowCheck = () => {
            if (currentRef) {
                const isOverflowing = currentRef.scrollHeight > currentRef.clientHeight;
                setIsOverflowing(isOverflowing)
            }
        };

        const resizeObserver = new ResizeObserver(handleOverflowCheck);
        if (currentRef) {
            resizeObserver.observe(currentRef);
        }

        handleOverflowCheck();

        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
            resizeObserver.disconnect();
        };
    }, [props, schedule]);

    return (
        (errorMessage &&
            <div className={styles.noFetchDataBlock}>
                <h2 style={{
                    color: 'red'
                }}>{errorMessage}</h2>
                <button onClick={fetchData} className={stylesFromSchedule.link}>{'Повторить попытку'}</button>
            </div>
        )
        || ((isLoading || !schedule)
            && <Preloader/>
        )
        || (noContentMessage &&
            <h2 style={{textAlign: 'center', height: '100%', alignContent: 'center'}}>{noContentMessage}</h2>)
        || <>
            <table
                className={`${styles.scheduleTableHeader}${(isOverflowing && ` ${styles.scheduleTableHeaderScroll}`) || ''}`}>
                <thead className={styles.scheduleHeader}>
                {
                    (props.frame && <ScheduleTableHeaderClassSchedule
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
                        (props.frame && <ScheduleTableBodyClassesSchedule
                            schedule={schedule as Schedule}/>)
                        || <ScheduleTableBodyLoadsInfo schedule={schedule as Schedule219[]}/>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}