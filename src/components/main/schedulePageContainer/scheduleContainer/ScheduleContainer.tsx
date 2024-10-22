import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import generalStyles from '../../../../App.module.css'
import {getSchedule, getSchedule219, Schedule, Schedule219} from "../../../../api/schedule-backend-api";
import Preloader from "../../../preloader/Preloader";
import {FrameType} from "../../../../redux/scheduleSlice";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";

type ScheduleTableContainerProps = {
    startDate: Date
    endDate: Date
    frame?: FrameType
}

export const ScheduleContainer: FC<ScheduleTableContainerProps> = (props) => {

    const [schedule, setSchedule] = useState<Schedule | Schedule219[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const requestIdRef = useRef(0);

    const fetchData = useCallback(() => {
        const requestId = ++requestIdRef.current;
        setIsLoading(true)
        setErrorMessage(null)
        const fetchSchedule = () => {
            return ((props.frame &&
                    getSchedule(props.startDate.toLocaleDateString('en-CA'),
                        props.endDate.toLocaleDateString('en-CA'),
                        props.frame))
                || getSchedule219(props.startDate.toLocaleDateString('en-CA'),
                    props.endDate.toLocaleDateString('en-CA')))
        }

        fetchSchedule()
            .then((data) => {
                if (requestId === requestIdRef.current)
                    setSchedule(data);
            })
            .catch((reason) => {
                if (requestId === requestIdRef.current) {
                    console.log(reason)
                    setErrorMessage('Не удалось получить расписание из диспетчерской.')
                }
            })
            .finally(() => {
                if (requestId === requestIdRef.current)
                    setIsLoading(false)
            })
    }, [props])

    useEffect(() => {
        fetchData()
    }, [props]);

    return (
        (errorMessage &&
            <div className={generalStyles.noFetchDataBlock}>
                <h2 style={{
                    color: 'red'
                }}>{errorMessage}</h2>
                <button onClick={fetchData} className={generalStyles.link}>{'Повторить попытку'}</button>
            </div>
        )
        || ((isLoading || !schedule)
            && <Preloader/>
        )
        || ((((schedule as Schedule).schedules && (Object.keys((schedule as Schedule).schedules).length === 0))
                || Object.keys(schedule as Schedule219[]).length === 0) &&
            <h2 style={{
                textAlign: 'center',
                height: '100%',
                alignContent: 'center'
            }}>{'На этой неделе расписания нет.'}</h2>
        )
        || <ScheduleTableContainer schedule={schedule as Schedule | Schedule219[]} frame={props.frame}/>
    )
}