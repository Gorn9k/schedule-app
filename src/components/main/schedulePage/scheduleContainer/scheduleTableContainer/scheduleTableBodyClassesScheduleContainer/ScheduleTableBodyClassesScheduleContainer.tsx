import {FC} from "react";
import {FrameType} from "../../../../../../redux/scheduleSlice";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

type ScheduleTableBodyClassesScheduleContainerProps = {
    frame: FrameType
}

export const ScheduleTableBodyClassesScheduleContainer: FC<ScheduleTableBodyClassesScheduleContainerProps> = ({frame}) => {

    const schedules = useSelector((state: RootState) => state.schedule.schedules)
    const days = useSelector((state: RootState) => state.schedule.days)
    const classesNumbers = useSelector((state: RootState) => state.schedule.classesNumbers)

    return <ScheduleTableBodyClassesSchedule schedules={schedules} classesNumbers={classesNumbers} days={days}/>
}