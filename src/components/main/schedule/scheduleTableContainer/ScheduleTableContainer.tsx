import React, {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from './/ScheduleTableContainer.module.css'
import {getSchedule, getSchedule219, Schedule, Schedule219} from "../../../../api/schedule-backend-api";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";
import {getUniqueSortedRoomNumbers} from "../../../../utils/dates";
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

    const prevPropsRef = useRef(props);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);

    useEffect(() => {
        const requestId = ++requestIdRef.current;
        const fetchSchedule = async () => {
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
                    (((data as Schedule).schedules.length === 0 || Object.keys(data as Schedule219[]).length === 0)
                        && setNoContentMessage('На этой неделе расписания нет.'))
                    || setSchedule(data as Schedule | Schedule219[]);
                })
                .catch((reason) => {
                    console.log(reason)
                    setErrorMessage('Не удалось получить расписание из диспетчерской.')
                })
                .finally(() => {
                    prevPropsRef.current = props
                })
        }
    }, [props]);

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

        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
            resizeObserver.disconnect();
        };
    }, [props, schedule]);

    return (
        (errorMessage &&
            <h2 style={{
                color: 'red',
                textAlign: 'center',
                height: '100vh',
                alignContent: 'center'
            }}>{errorMessage}</h2>)
        || ((prevPropsRef.current !== props || !schedule)
            && <Preloader/>
        )
        || (noContentMessage &&
            <h2 style={{textAlign: 'center', height: '100vh', alignContent: 'center'}}>{noContentMessage}</h2>)
        || <>
            <table
                className={`${styles.scheduleTableHeader}${(isOverflowing && ` ${styles.scheduleContainerHeaderr}`) || ''}`}>
                <thead className={styles.scheduleHeader}>
                {
                    (props.frame && <ScheduleTableHeaderClassSchedule
                        classes={(schedule as Schedule).classesNumbers}/>)
                    || <ScheduleTableHeaderLoadsInfo/>
                }
                </thead>
            </table>
            <div ref={bodyContainerRef}
                 className={`${styles.scheduleContainerBody} ${styles.scheduleContainerBodyNoContent}`}>
                <table className={styles.scheduleTableBodyNoContent}>
                    <tbody className={`${styles.scheduleBody}`}>
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