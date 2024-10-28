import {FC} from "react";
import {FrameType} from "../../../../../../../redux/scheduleSlice";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassSchedule/ScheduleTableHeaderClassSchedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../redux/store";

type ScheduleTableHeaderClassScheduleContainerProps = {
    frame: FrameType
}

export const ScheduleTableHeaderClassScheduleContainer: FC<ScheduleTableHeaderClassScheduleContainerProps> = ({frame}) => {

    const classes = useSelector((state: RootState) => state.schedule.classesNumbers)

    return <ScheduleTableHeaderClassSchedule classes={classes}/>
}