import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export function withFrame<T>(WrappedComponent: React.ComponentType<T>) {

    return (props: Omit<T, 'frame'>) => {

        const frame = useSelector((state: RootState) => state.schedule.frame)

        return frame !== null ? <WrappedComponent {...(props as T)} frame={frame}/> : null
    };
}