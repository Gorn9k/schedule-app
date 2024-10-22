import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export function withStartDateAndEndDate<T>(WrappedComponent: React.ComponentType<T>) {

    return (props: Omit<T, 'startDate' | 'endDate'>) => {

        const startDateTime = useSelector((state: RootState) => state.schedule.startDateTime)
        const endDateTime = useSelector((state: RootState) => state.schedule.endDateTime)

        return ((!startDateTime || !endDateTime) && null) || <WrappedComponent {...(props as T)}
                                                                               startDate={new Date(startDateTime as number)}
                                                                               endDate={new Date(endDateTime as number)} />
    };
}