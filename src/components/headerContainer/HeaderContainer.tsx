import React, {FC} from "react";
import {Header} from "./header/Header";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

type HeaderContainerProps = {
    title?: string
}

export const HeaderContainer: FC<HeaderContainerProps> = (props) => {

    const frame = useSelector((state: RootState) => state.schedule.frame);

    if (!frame) return null

    const title = (props.title && props.title) || (frame === 'FIRST' ?
        'Расписание аудиторий(ЦИТ) в первом учебном корпусе' : frame === 'FOURTH' ? 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе' : '')

    return <Header title={title}/>
}