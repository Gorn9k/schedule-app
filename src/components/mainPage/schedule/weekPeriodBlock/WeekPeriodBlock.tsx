import React, {FC} from "react";
import {Link} from "react-router-dom";
import {
    generateCurrentEndDateMilliseconds,
    generateCurrentStartDateMilliseconds,
    generateRequestParamWeekPeriodByDate
} from "../../../../utils/dates";

type WeekPeriodBlockProps = {
    startDate?: Date | undefined
    endDate?: Date | undefined
    requestParams?: Record<string, string> | undefined
    href: string
    className?: string | undefined
    onClickPrev?: () => void | undefined
    onClickNext?: () => void | undefined
}

export const WeekPeriodBlock: FC<WeekPeriodBlockProps> = (props) => {

    const generateNextQueryDatePeriod = (date: Date) => generateRequestParamWeekPeriodByDate(new Date(new Date(date).setDate(date.getDate() + 7)))

    const generatePrevQueryDatePeriod = (date: Date) => generateRequestParamWeekPeriodByDate(new Date(new Date(date).setDate(date.getDate() - 7)))

    const generateContainerDatePeriod = (startDate: Date, endDate: Date) => {

        const firstDayOfWeekString = `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getFullYear()}`;
        const lastDayOfWeekString = `${endDate.getDate().toString().padStart(2, '0')}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getFullYear()}`;

        return `${firstDayOfWeekString} - ${lastDayOfWeekString}`;
    }

    const getLinkUri = (weekPeriod: string) => {
        return `${props.href}?${weekPeriod}${(props.requestParams &&
            Object.keys(props.requestParams).map((value) => props.requestParams && `&${value}=${props.requestParams[value]}`)) || ''}`
    }

    return (
        <div className={props.className}>
            <Link onClick={props.onClickPrev}
                  to={getLinkUri(generatePrevQueryDatePeriod((props.startDate && props.startDate) || new Date()))}>{'<<'}</Link>
            <div>{`${generateContainerDatePeriod((props.startDate && props.startDate) || new Date(generateCurrentStartDateMilliseconds()),
                (props.endDate && props.endDate) || new Date(generateCurrentEndDateMilliseconds()))}`}</div>
            <Link onClick={props.onClickNext}
                  to={getLinkUri(generateNextQueryDatePeriod((props.endDate && props.endDate) || new Date()))}>{'>>'}</Link>
        </div>
    )
}