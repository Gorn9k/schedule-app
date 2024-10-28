import {FC} from "react";
import {ScheduleTableBodyLoadsInfo} from "./scheduleTableBodyLoadsInfo/ScheduleTableBodyLoadsInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/store";

export const ScheduleTableBodyLoadsInfoContainer: FC = () => {

    const loadsInfo = useSelector((state: RootState) => state.schedule.loadsInfo)

    return <ScheduleTableBodyLoadsInfo loadsInfo={loadsInfo}/>
}