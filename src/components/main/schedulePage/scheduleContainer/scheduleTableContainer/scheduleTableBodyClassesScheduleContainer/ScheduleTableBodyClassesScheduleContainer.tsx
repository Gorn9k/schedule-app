import {FC} from "react";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

export const ScheduleTableBodyClassesScheduleContainer: FC = () => {

    const lessons = useSelector((state: RootState) => state.schedule.lessons)
    const days = useSelector((state: RootState) => state.schedule.days)
    const classesNumbers = useSelector((state: RootState) => state.schedule.classesNumbers)

    return <ScheduleTableBodyClassesSchedule lessons={lessons} classesNumbers={classesNumbers} days={days}/>
}