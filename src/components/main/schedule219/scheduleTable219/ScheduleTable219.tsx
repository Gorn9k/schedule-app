import React, {FC, useEffect, useRef, useState} from 'react'
import styles from './ScheduleTable219.module.css'
import stylesFromScheduleTable from '../../schedule/scheduleTable/ScheduleTable.module.css'
import stylesFromSchedule from '../../schedule/Schedule.module.css'
import Preloader from "../../../preloader/Preloader";
import {getSchedule219, Schedule219} from '../../../../api/schedule-backend-api';
import {Link, NavLink} from "react-router-dom";

type ScheduleTablePropsType = {
    startDate: string
    endDate: string
}

const ScheduleTable219: FC<ScheduleTablePropsType> = (props) => {

    const [schedule, setSchedule] = useState<Array<Schedule219> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const bodyContainerRef = useRef<HTMLDivElement | null>(null);
    const headerContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkOverflow = () => {
            const bodyContainer = bodyContainerRef.current;
            const headerContainer = headerContainerRef.current;
            if (bodyContainer && headerContainer) {
                if (bodyContainer.scrollHeight > bodyContainer.clientHeight)
                    setIsOverflowing(true)
                else
                    setIsOverflowing(false)
            }
        };

        const fetchSchedule = async () => {
            setLoading(true);
            const data = await getSchedule219(props.startDate, props.endDate);
            setSchedule(data);
        };

        fetchSchedule()
            .then(() => {
                setError(null)
            })
            .catch(() => setError('Не удалось получить расписание из диспетчерской'))
            .finally(() => {
                    setLoading(false)
                    setTimeout(checkOverflow)
                }
            )

        window.addEventListener('resize', checkOverflow)

        return () => {
            window.removeEventListener('resize', checkOverflow)
        }
    }, [props.startDate, props.endDate])

    const switchByDayNumber = (value: number | undefined): string => {
        switch (value) {
            case 0:
                return 'Понедельник';
            case 1:
                return 'Вторник';
            case 2:
                return 'Среда';
            case 3:
                return 'Четверг';
            case 4:
                return 'Пятница';
            case 5:
                return 'Суббота';
            case 6:
                return 'Воскресенье';
            default:
                return 'Not Found';
        }
    };

    const _switchByDayNumber = (stringDate: string) => {
        const date = new Date(stringDate).getDay()
        return switchByDayNumber(date === 0 ? 6 : date - 1)
    }

    const switchByLessonNumber = (value: number | undefined): string => {
        switch (value) {
            case 1:
                return '08.00-09.35';
            case 2:
                return '09.50-11.25';
            case 3:
                return '11.40-13.15';
            case 4:
                return '14.00-15.35';
            case 5:
                return '15.45-17.20';
            case 6:
                return '17.30-19.05';
            case 7:
                return '19.15-20.50';
            default:
                return 'Not Found';
        }
    };

    const mergeDayOfWeekRowsNumber = (schedule: Array<Schedule219>, date: string) => {
        let count = 0
        schedule.forEach(value => {
            if (value?.date === date)
                count++
        })
        return count
    }

    return (
        <>
            {loading && <Preloader/>}
            {!loading && error &&
                <h2 style={{color: 'red', textAlign: 'center', height: '100vh', alignContent: 'center'}}>{error}</h2>}
            {!loading && schedule && <div className={`${stylesFromScheduleTable.scheduleContainer} ${styles.scheduleContainer}`}>
                <div className={`${stylesFromSchedule.button} ${styles.buttonAddLoadInfo}`}>
                    <Link to={`/loads-info/create`}>Добавить нагрузку</Link>
                </div>
                <div ref={headerContainerRef}
                     className={`${styles.scheduleContainerHeader}${(isOverflowing && ` ${stylesFromScheduleTable.scheduleContainerHeader}`) || ''}`}
                     id="table-header-container">
                    <table className={stylesFromScheduleTable.scheduleTableHeader}>
                        <thead className={stylesFromScheduleTable.scheduleHeader}>
                        <tr>
                            <th className={stylesFromScheduleTable.thAndTdDayAndTime}>День недели</th>
                            <th className={stylesFromScheduleTable.thAndTdDayAndTime}>Время</th>
                            <th>Тип</th>
                            <th>Ответственный</th>
                            <th>Комментарий</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div ref={bodyContainerRef}
                     className={`${stylesFromScheduleTable.scheduleContainerBody}${(Object.keys(schedule).length === 0
                         && ` ${stylesFromScheduleTable.scheduleContainerBodyNoContent}`) || ''}`} id="table-body-container">

                </div>
            </div>}
        </>
    )
}

export default ScheduleTable219;