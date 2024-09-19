import React, {FC, ReactNode} from "react";
import styles from "../ScheduleTable.module.css";

type ScheduleTableHeaderPropsType = {
    children: ReactNode
}

export const ScheduleTableHeader: FC<ScheduleTableHeaderPropsType> = (props) => {

    return (
        <table className={styles.scheduleTableHeader}>
            <thead className={styles.scheduleHeader}>
            {props.children}
            </thead>
        </table>
    )
}