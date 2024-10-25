import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export function withStartDateAndEndDate<T>(WrappedComponent: React.ComponentType<T>) {

    return (props: Omit<T, 'startDateTime' | 'endDateTime'>) => {

        const startDateTime = useSelector((state: RootState) => state.schedule.startDateTime)
        const endDateTime = useSelector((state: RootState) => state.schedule.endDateTime)

        return <WrappedComponent {...(props as T)}
                                 startDateTime={startDateTime}
                                 endDateTime={endDateTime}/>
    };
}