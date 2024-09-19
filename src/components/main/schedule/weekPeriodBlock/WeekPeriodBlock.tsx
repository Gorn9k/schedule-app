import React, {FC} from "react";
import {Link} from "react-router-dom";
import {generateNewWeekPeriodDateMilliseconds} from "../../../../../utils/dates";

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
        <div>
            <Link to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(props.startDate.getMilliseconds(), -1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(props.endDate.getMilliseconds(), -1)))
                  }>{'<<'}</Link>
            <div>{containerDatePeriod}</div>
            <Link to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(props.startDate.getMilliseconds(), 1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(props.endDate.getMilliseconds(), 1)))
                  }>{'>>'}</Link>
        </div>
    )
}