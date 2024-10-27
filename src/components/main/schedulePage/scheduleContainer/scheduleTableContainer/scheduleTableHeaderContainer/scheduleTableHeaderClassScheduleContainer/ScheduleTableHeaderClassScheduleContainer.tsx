import {FC} from "react";
import {FrameType} from "../../../../../../../redux/scheduleSlice";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassSchedule/ScheduleTableHeaderClassSchedule";

type ScheduleTableHeaderClassScheduleContainerProps = {
    frame: FrameType
}

export const ScheduleTableHeaderClassScheduleContainer: FC<ScheduleTableHeaderClassScheduleContainerProps> = ({frame}) => {

    return <ScheduleTableHeaderClassSchedule classes={null}/>
}