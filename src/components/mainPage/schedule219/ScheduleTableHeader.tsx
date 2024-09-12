import React, {FC, useEffect, useState} from "react";
import styles from "../schedule/scheduleTable/ScheduleTable.module.css";
import stylesFromSchedule from "../schedule/Schedule.module.css";
import {Link} from "react-router-dom";
import stylesFromScheduleTable from "../schedule/scheduleTable/ScheduleTable.module.css";

type ScheduleTableHeaderPropsType = {
    headerContainerRef: React.MutableRefObject<HTMLDivElement | null>
    bodyContainerRef: React.MutableRefObject<HTMLDivElement | null>
    classes: string[] | null
    frame: string | null
}

export const ScheduleTableHeader: FC<ScheduleTableHeaderPropsType> = (props) => {

    const [isOverflowing, setIsOverflowing] = useState(false);

    console.log('ScheduleHeader render')

    const checkOverflow = () => {
        const bodyContainer = props.bodyContainerRef.current;
        const headerContainer = props.headerContainerRef.current;
        if (bodyContainer && headerContainer) {
            if (bodyContainer.scrollHeight > bodyContainer.clientHeight)
                setIsOverflowing(true)
            else
                setIsOverflowing(false)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', checkOverflow)

        return () => {
            window.removeEventListener('resize', checkOverflow)
        }
    }, [])

    return <>
        {props.frame
            && <div ref={props.headerContainerRef}
                    className={(isOverflowing && `${styles.scheduleContainerHeader}`) || undefined}
                    id="table-header-container">
                <table className={styles.scheduleTableHeader}>
                    <thead className={styles.scheduleHeader}>
                    <tr>
                        <th rowSpan={2} className={styles.thAndTdDayAndTime}>День недели</th>
                        <th rowSpan={2} className={styles.thAndTdDayAndTime}>Время занятия</th>
                        <th colSpan={props.classes && props.classes.length > 0 ? props.classes.length : undefined}>Номер
                            аудитории
                        </th>
                    </tr>
                    {props.classes && props.classes.length > 0 ?
                        <tr>
                            {props.classes?.map(value => <th key={value}>{value}</th>)}
                        </tr> : null
                    }
                    </thead>
                </table>
            </div>
            || <>
                <div className={`${stylesFromSchedule.button} ${styles.buttonAddLoadInfo}`}>
                    <Link to={`/loads-info/create`}>Добавить нагрузку</Link>
                </div>
                <div ref={props.headerContainerRef}
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
            </>
        }
    </>
}