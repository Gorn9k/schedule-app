import React, {FC} from 'react'
import {Schedule} from "./schedule/Schedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {FrameType} from "../../../redux/scheduleSlice";
import {withFrame} from "../../../hocs/withFrame";

type ScheduleContainerProps = {
    frame?: FrameType
}

export const ScheduleContainer: FC<ScheduleContainerProps> = ({frame}) => {

    const startDateTime = useSelector((state: RootState) => state.schedule.startDateTime)
    const endDateTime = useSelector((state: RootState) => state.schedule.endDateTime)

    if (!startDateTime || !endDateTime) return null

    return <Schedule startDate={new Date(startDateTime)} endDate={new Date(endDateTime)} frame={frame}/>
}

export const WithFrameScheduleContainer = withFrame(ScheduleContainer)
