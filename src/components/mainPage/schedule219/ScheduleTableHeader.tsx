import React, {FC} from "react";
import styles from "../schedule/scheduleTable/ScheduleTable.module.css";

const ScheduleTableHeader: FC = () => {

    return <>
        {/*<div ref={headerContainerRef} className={(isOverflowing && `${styles.scheduleContainerHeader}`) || undefined}*/}
        {/*     id="table-header-container">*/}
        {/*    <table className={styles.scheduleTableHeader}>*/}
        {/*        <thead className={styles.scheduleHeader}>*/}
        {/*        <tr>*/}
        {/*            <th rowSpan={2} className={styles.thAndTdDayAndTime}>День недели</th>*/}
        {/*            <th rowSpan={2} className={styles.thAndTdDayAndTime}>Время занятия</th>*/}
        {/*            <th colSpan={classes && classes.length > 0 ? classes.length : undefined}>Номер аудитории*/}
        {/*            </th>*/}
        {/*        </tr>*/}
        {/*        {classes && classes.length > 0 ?*/}
        {/*            <tr>*/}
        {/*                {classes?.map(value => <th key={value}>{value}</th>)}*/}
        {/*            </tr> : null*/}
        {/*        }*/}
        {/*        </thead>*/}
        {/*    </table>*/}
        {/*</div>*/}
    </>
}