import React, {FC} from "react";
import {Link} from "react-router-dom";
import {generateNewWeekPeriodDateMilliseconds} from "../../../../utils/dates";
import styles from "./WeekPeriodBlock.module.css";

type WeekPeriodBlockProps = {
    startDate: Date,
    endDate: Date,
    requestParams?: Record<string, string> | undefined
    to: string
}

export const WeekPeriodBlock: FC<WeekPeriodBlockProps> = (props) => {

    const containerDatePeriod = `${props.startDate.toLocaleDateString('ru-RU')} - ${props.endDate.toLocaleDateString('ru-RU')}`
    const getLinkUri = (startDate: Date, endDate: Date) => {
        return `${props.to}?${new URLSearchParams(
            {
                startDate: startDate.toLocaleDateString('en-CA'),
                endDate: endDate.toLocaleDateString('en-CA'),
                ...props.requestParams
            }).toString()}`
    }

    return (
        <div className={styles.weekPeriodBlock}>
            <Link to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(props.startDate.getTime(), -1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(props.endDate.getTime(), -1)))
                  }>{'<<'}</Link>
            <p>{containerDatePeriod}</p>
            <Link to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(props.startDate.getTime(), 1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(props.endDate.getTime(), 1)))
                  }>{'>>'}</Link>
        </div>
    )
}