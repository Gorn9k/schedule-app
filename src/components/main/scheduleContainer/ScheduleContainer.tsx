import React, {FC} from 'react'
import {Schedule} from "./schedule/Schedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const ScheduleContainer: FC = () => {

    const startDateTime = useSelector((state: RootState) => state.schedule.startDateTime)
    const endDateTime = useSelector((state: RootState) => state.schedule.endDateTime)
    const frame = useSelector((state: RootState) => state.schedule.frame);

    console.log('schedule')

    if (!startDateTime || !endDateTime || !frame) return null

    return <Schedule startDate={new Date(startDateTime)} endDate={new Date(endDateTime)} frame={frame}/>
}

export default ScheduleContainer;
