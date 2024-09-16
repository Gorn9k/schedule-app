import React, {FC, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom"
import styles from "./Schedule.module.css"
import ScheduleTable from "./scheduleTable/ScheduleTable";
import {next, prev} from "../../../redux/currentWeekPeriodSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import ScheduleTable219 from "../schedule219/scheduleTable219/ScheduleTable219";
import {setError} from "../../../redux/connectionErrorMessageSlice";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";

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

    const title = (frame && (frame === 'FIRST' ?
        'Расписание аудиторий(ЦИТ) в первом учебном корпусе' :
        'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе')) || 'Расписание занятости в 219 аудитории';

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

                        <WeekPeriodBlock startDate={startDate}
                                         endDate={endDate}
                                         href={'/class-schedule'}
                                         requestParams={(frame && {frame: frame}) || undefined}
                                         onClickNext={() => {
                                             dispatch(setError({error: null}))
                                             dispatch(next())
                                         }}
                                         onClickPrev={() => {
                                             dispatch(setError({error: null}))
                                             dispatch(prev())
                                         }}
                                         />


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
