import React, {FC} from "react";
import {WeekPeriodBlock} from "./weekPeriodBlock/WeekPeriodBlock";
import generalStyles from "../../../App.module.css";
import styles from "./SchedulePage.module.css";
import {ScheduleContainer} from "./scheduleContainer/ScheduleContainer";
import {FrameType} from "../../../redux/scheduleSlice";
import {withFrame} from "../../../hocs/withFrame";
import {withStartDateAndEndDate} from "../../../hocs/withStartDateAndEndDate";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {setShowLoadInfoModal} from "../../../redux/showModalSlice";

type SchedulePageProps = {
    startDate: Date
    endDate: Date
    frame: FrameType
}

export const SchedulePage: FC<SchedulePageProps> = ({startDate, endDate, frame}) => {

    const weekPeriodBlockName = (frame && 'Период занятий') || 'Период занятости'

    const dispatch = useDispatch<AppDispatch>()

    return <>
        <h2>{weekPeriodBlockName}</h2>
        <WeekPeriodBlock to={(frame && '/class-schedule') || '/loads-info'}
                         startDate={startDate}
                         endDate={endDate}
                         requestParams={(frame && {frame: frame}) || undefined}/>

        {
            !frame &&
                <button onClick={() => dispatch(setShowLoadInfoModal(true))} className={`${generalStyles.button} ${generalStyles.formButton} ${styles.addLoadInfoLink}`}>
                    Добавить нагрузку
                </button>
        }
        <ScheduleContainer startDate={startDate}
                           endDate={endDate}
                           frame={frame}/>
    </>
}

export const SchedulePageContainer = withStartDateAndEndDate(withFrame(SchedulePage))