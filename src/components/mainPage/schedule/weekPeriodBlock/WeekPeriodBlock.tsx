import React, {FC} from "react";
import {Link} from "react-router-dom";
import {generateNewWeekPeriodDateMilliseconds} from "../../../../utils/dates";
import {setError} from "../../../../redux/connectionErrorMessageSlice";
import {next, prev} from "../../../../redux/scheduleSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";

type WeekPeriodBlockProps = {
    requestParams?: Record<string, string> | undefined
    to: string
}

export const WeekPeriodBlock: FC<WeekPeriodBlockProps> = (props) => {

    const currentWeekPeriod = useSelector((state: RootState) => state.currentWeekPeriod)
    const dispatch = useDispatch<AppDispatch>()

    const containerDatePeriod = `${new Date(currentWeekPeriod.startDateTime)
        .toLocaleDateString('ru-RU')} - ${new Date(currentWeekPeriod.endDateTime).toLocaleDateString('ru-RU')}`
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
            <Link onClick={() => {
                dispatch(setError({error: null}))
                dispatch(prev())
            }}
                  to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(currentWeekPeriod.startDateTime, -1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(currentWeekPeriod.endDateTime, -1)))
                  }>{'<<'}</Link>
            <div>{containerDatePeriod}</div>
            <Link onClick={() => {
                dispatch(setError({error: null}))
                dispatch(next())
            }}
                  to={getLinkUri(
                      new Date(generateNewWeekPeriodDateMilliseconds(currentWeekPeriod.startDateTime, 1)),
                      new Date(generateNewWeekPeriodDateMilliseconds(currentWeekPeriod.endDateTime, 1)))
                  }>{'>>'}</Link>
        </div>
    )
}