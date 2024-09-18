import React, {FC} from "react";
import styles from "../Schedule.module.css";
import ScheduleTable219 from "../../schedule219/scheduleTable219/ScheduleTable219";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import ScheduleTable from "./scheduleTable/ScheduleTable";

type ScheduleMainProps = {

}

export const ScheduleMain: FC<ScheduleMainProps> = () => {

    return (
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
    )
}