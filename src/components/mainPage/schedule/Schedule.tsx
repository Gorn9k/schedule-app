import React, {FC, useEffect} from 'react'
import {Link, NavLink, useLocation} from "react-router-dom"
import styles from "./Schedule.module.css"
import ScheduleTable from "./scheduleTable/ScheduleTable";
import {next, prev} from "../../../redux/scheduleSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import ScheduleTable219 from "../schedule219/scheduleTable219/ScheduleTable219";
import {setError} from "../../../redux/connectionErrorMessageSlice";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import generalStyles from './../../../App.module.css'
import {ScheduleHeader} from "./scheduleHeader/ScheduleHeader";

const Schedule: FC = () => {

    const location = useLocation()

    console.log('Schedule render')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)

        const startDate = queryParams.get('startDate')
        const endDate = queryParams.get('endDate')
        const frame = queryParams.get('frame')



    }, [location.search]);

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    return (
        <>
            <ScheduleHeader />
            <main>
                <div className={styles.weekPeriodBlock}>
                    {weekPeriodBlockName}

                        <WeekPeriodBlock to={'/class-schedule'}
                                         requestParams={(frame && {frame: frame}) || undefined}/>
                </div>
                {(frame && <ScheduleTable/>)
                    || <ScheduleTable219 startDate={startDate.toISOString().split('T')[0]}
                                         endDate={endDate.toISOString().split('T')[0]}/>
                }
            </main>
        </>
    )
}

export default Schedule;
