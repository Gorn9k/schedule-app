import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export function withStartDateAndEndDate<T>(WrappedComponent: React.ComponentType<T>) {

    return (props: Omit<T, 'startDate' | 'endDate'>) => {

        const startDateTime = useSelector((state: RootState) => state.schedule.startDateTime)
        const endDateTime = useSelector((state: RootState) => state.schedule.endDateTime)

        return startDateTime && endDateTime ? <WrappedComponent {...(props as T)}
                                                                startDate={startDateTime ? new Date(startDateTime) : null}
                                                                endDate={endDateTime ? new Date(endDateTime) : null}/> : null
    };
}