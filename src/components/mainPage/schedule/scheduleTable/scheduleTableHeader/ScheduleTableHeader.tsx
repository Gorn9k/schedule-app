import React, {FC, useEffect} from "react";
import styles from "../ScheduleTable.module.css";
import stylesFromScheduleTable from "../ScheduleTable.module.css";
import stylesFromSchedule from "../../Schedule.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {ScheduleTableHeaderClassSchedule} from "./scheduleTableHeaderClassShedule/ScheduleTableHeaderClassSchedule";
import {ScheduleTableHeaderLoadsInfo} from "./scheduleTableHeaderLoadsInfo/ScheduleTableHeaderLoadsInfo";

type ScheduleTableHeaderPropsType = {
    classes: string[] | null
    frame: string | null
}

export const ScheduleTableHeader: FC<ScheduleTableHeaderPropsType> = (props) => {

    const isOverflowing = useSelector((state: RootState) => state.overflowTableBody.isOverflowing)

    console.log(`ScheduleHeader render`)

    useEffect(() => {
        return () => {
            console.log("ScheduleHeader unmounted");
        }
    }, [])

    return (props.frame
            && <ScheduleTableHeaderClassSchedule isOverflowing={isOverflowing}
                                                             classes={(props.frame && props.frame === 'FIRST' ?
                                                                 ['122', '212', '221', '417'] : ['214', '310', '312', '318'])}/>)
            || <ScheduleTableHeaderLoadsInfo isOverflowing={isOverflowing}/>
}