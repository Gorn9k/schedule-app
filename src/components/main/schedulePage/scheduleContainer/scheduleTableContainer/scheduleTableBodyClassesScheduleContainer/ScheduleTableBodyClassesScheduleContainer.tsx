import {FC} from "react";
import {ScheduleTableBodyClassesSchedule} from "./scheduleTableBodyClassesSchedule/ScheduleTableBodyClassesSchedule";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";
import {Lesson} from "../../../../../../api/schedule-backend-api";

type ScheduleTableBodyClassesScheduleProps = {
    lessons: Lesson[]
}

export const ScheduleTableBodyClassesScheduleContainer: FC<ScheduleTableBodyClassesScheduleProps> = ({lessons}) => {

    const days = useSelector((state: RootState) => state.schedule.days)
    const classesNumbers = useSelector((state: RootState) => state.schedule.classesNumbers)

    return <ScheduleTableBodyClassesSchedule lessons={lessons} classesNumbers={classesNumbers} days={days}/>
}