import React, {FC} from "react";
import generalStyles from '../../../../App.module.css'
import Preloader from "../../../preloader/Preloader";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../redux/store";
import {FrameType, repeatFetchLoadsInfo, repeatFetchSchedule} from "../../../../redux/scheduleSlice";
import {withFrame} from "../../../../hocs/withFrame";

export const ScheduleContainer: FC = () => {

    const errorMessage = useSelector((state: RootState) => state.schedule.errorMessage)
    const isLoading = useSelector((state: RootState) => state.schedule.isLoading)

    const dispatch = useDispatch<AppDispatch>()

    const RepeatButton: FC<{frame: FrameType}> = ({frame}) => {

        return <button onClick={() => dispatch(frame ? repeatFetchSchedule() : repeatFetchLoadsInfo())} className={generalStyles.link}>{'Повторить попытку'}</button>
    }

    const EnhancedRepeatButton = withFrame(RepeatButton)

    return (
        (errorMessage &&
            <div className={generalStyles.noFetchDataBlock}>
                <h2 style={{
                    color: 'red'
                }}>{errorMessage}</h2>
                <EnhancedRepeatButton/>
            </div>
        )
        || (isLoading
            && <Preloader/>
        )
        || <ScheduleTableContainer/>
    )
}