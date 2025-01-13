import React, {FC} from "react";
import {Header} from "./header/Header";
import {FrameType} from "../../redux/scheduleSlice";
import {withFrame} from "../../hocs/withFrame";

type HeaderScheduleContainerProps = {
    frame: FrameType
}

const HeaderScheduleContainer: FC<HeaderScheduleContainerProps> = ({frame}) => {

    if (!frame) return null

    const title = frame === 'FIRST' ?
        'Расписание аудиторий(ЦИТ) в первом учебном корпусе' : 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'

    return <Header title={title}/>
}

export const WithFrameHeader = withFrame(HeaderScheduleContainer)