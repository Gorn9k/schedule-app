import React, {FC} from "react";
import {Link} from "react-router-dom";
import {generateNewWeekPeriodDateMilliseconds} from "../../../../utils/dates";
import {FrameType} from "../../../../redux/scheduleSlice";

type WeekPeriodBlockProps = {
    startDate: Date,
    endDate: Date,
    frame: FrameType
}

export const WeekPeriodBlock: FC<WeekPeriodBlockProps> = ({startDate, endDate, frame}) => {

    const containerDatePeriod = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`

    const getLinkUri = (startDate: Date, endDate: Date) => {
        const urlParams = new URLSearchParams(
            {
                startDate: startDate.toLocaleDateString('en-CA'),
                endDate: endDate.toLocaleDateString('en-CA')
            })
        frame && urlParams.set('frame', frame)

        return `${frame ? '/classes-schedule' : '/loads-info-schedule'}?${urlParams.toString()}`
    }

    return <>
        <Link to={getLinkUri(
            new Date(generateNewWeekPeriodDateMilliseconds(startDate.getTime(), -1)),
            new Date(generateNewWeekPeriodDateMilliseconds(endDate.getTime(), -1)))
        }>{'<<'}</Link>
        <p>{containerDatePeriod}</p>
        <Link to={getLinkUri(
            new Date(generateNewWeekPeriodDateMilliseconds(startDate.getTime(), 1)),
            new Date(generateNewWeekPeriodDateMilliseconds(endDate.getTime(), 1)))
        }>{'>>'}</Link>
    </>
}