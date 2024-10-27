import {FC} from "react";
import {FrameType} from "../../../../../../redux/scheduleSlice";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";

type ScheduleTableBodyClassesScheduleContainerProps = {
    frame: FrameType
}

export const ScheduleTableBodyClassesScheduleContainer: FC<ScheduleTableBodyClassesScheduleContainerProps> = ({frame}) => {

    return <ScheduleTableBodyClassesSchedule/>
}