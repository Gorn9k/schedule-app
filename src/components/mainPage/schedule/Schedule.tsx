import React, {FC, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom"
import styles from "./Schedule.module.css"
import ScheduleTable from "./scheduleTable/ScheduleTable";
import {next, prev} from "../../../redux/currentWeekPeriodSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import ScheduleTable219 from "../schedule219/scheduleTable219/ScheduleTable219";
import {setError} from "../../../redux/connectionErrorMessageSlice";

const Schedule: FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const startDate = new Date(queryParams.get('startDate') || Date.now())
    const endDate = new Date(queryParams.get('endDate') || Date.now())
    const frame = queryParams.get('frame')

    console.log('Schedule render')

    useEffect(() => {
        return () => {
            console.log("Schedule unmounted");
        };
    }, []);

    const dispatch = useDispatch<AppDispatch>()

    const _generateQueryDatePeriod = (date: Date) => {
        const firstDayOfWeek = date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1;
        const firstDayOfWeekDate = new Date(new Date(date).setDate(firstDayOfWeek));
        const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        const lastDayOfWeek = firstDayOfWeekDate.getDate() + 6;
        const lastDayOfWeekDate = new Date(firstDayOfWeekDate.setDate(lastDayOfWeek));
        const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

        return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
    }

    const generateNextQueryDatePeriod = (date: Date) => _generateQueryDatePeriod(new Date(new Date(endDate).setDate(date.getDate() + 7)))

    const generatePrevQueryDatePeriod = (date: Date) => _generateQueryDatePeriod(new Date(new Date(startDate).setDate(date.getDate() - 7)))

    const generateContainerDatePeriod = (startDate: Date, endDate: Date) => {

        const firstDayOfWeekString = `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getFullYear()}`;
        const lastDayOfWeekString = `${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getFullYear()}`;

        return `${firstDayOfWeekString} - ${lastDayOfWeekString}`;
    }

    const title = (frame && (frame === 'FIRST' ?
        'Расписание аудиторий(ЦИТ) в первом учебном корпусе' :
        'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе')) || 'Расписание занятости в 219 аудитории';

    const getLinkUri = (weekPeriod: string) => {
        return `/${(frame && `class-schedule?${weekPeriod}${frame === 'FIRST' ? '&frame=FIRST' : '&frame=FOURTH'}`) || `loads-info?${weekPeriod}`}`
    }

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    return (
        <>
            <header>
                <div className={styles.button}>
                    <Link to='/'>В главное меню</Link>
                </div>
                <div className={styles.title}>{title}
                </div>
            </header>

            <main>
                <div className={styles.weekPeriodBlock}>
                    {weekPeriodBlockName}
                    <div>
                        <Link onClick={() => {
                            dispatch(setError({error: null}))
                            dispatch(prev())
                        }}
                              to={getLinkUri(generatePrevQueryDatePeriod(startDate))}>{'<<'}</Link>
                        <div>{`${generateContainerDatePeriod(startDate, endDate)}`}</div>
                        <Link onClick={() => {
                            dispatch(setError({error: null}))
                            dispatch(next())
                        }}
                              to={getLinkUri(generateNextQueryDatePeriod(endDate))}>{'>>'}</Link>
                    </div>
                </div>
                {(frame && <ScheduleTable startDate={startDate.toISOString().split('T')[0]}
                                          endDate={endDate.toISOString().split('T')[0]}
                                          frame={frame && frame === 'FIRST' ? 'FIRST' : 'FOURTH'}/>)
                    || <ScheduleTable219 startDate={startDate.toISOString().split('T')[0]}
                                         endDate={endDate.toISOString().split('T')[0]}/>
                }
            </main>
        </>
    )
}

export default Schedule;
