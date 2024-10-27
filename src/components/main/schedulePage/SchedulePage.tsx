import React, {FC} from "react";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import styles from "./SchedulePage.module.css";
import {FrameType} from "../../../redux/scheduleSlice";
import {withFrame} from "../../../hocs/withFrame";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {withStartDateAndEndDate} from "../../../hocs/withStartDateAndEndDate";
import {Outlet} from "react-router-dom";
import {ScheduleContainer} from "./scheduleContainer/ScheduleContainer";

export const SchedulePage: FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate()
    //
    // const navigateTo = useSelector((state: RootState) => state.modal.navigateTo)
    //
    // useEffect(() => {
    //     if (navigateTo) {
    //         navigate(navigateTo)
    //     }
    // }, [navigateTo]);

    const WeekPeriodBlockName: FC<{frame: FrameType}> = ({frame}) => {

        const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

        return <h2>{weekPeriodBlockName}</h2>
    }

    const EnhancedWeekPeriodBlockName = withFrame(WeekPeriodBlockName)

    const EnhancedWeekPeriodBlock = withStartDateAndEndDate(withFrame(WeekPeriodBlock))

    const EnhancedScheduleContainer = withStartDateAndEndDate(ScheduleContainer)

    return <>
        <EnhancedWeekPeriodBlockName/>
        <div className={styles.weekPeriodBlock}>
            <EnhancedWeekPeriodBlock/>
        </div>
        <Outlet/>
        <EnhancedScheduleContainer/>
    </>
}