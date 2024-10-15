import React, {FC} from "react";
import generalStyles from "../../../App.module.css";
import {NavLink} from "react-router-dom";

type HeaderProps = {
    pathname: string;
    frame: string | null
}

export const Header: FC<HeaderProps> = ({pathname, frame}) => {

    const title = (pathname === '/loads-info' && 'Расписание занятости в 219 аудитории')
        || (frame && pathname === '/class-schedule' && (frame === 'FIRST' ?
            'Расписание аудиторий(ЦИТ) в первом учебном корпусе' :
            'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'))
        || (pathname.match(/^\/loads-info\/\d+\/edit$/) && 'Редактирование нагрузки')
        || (pathname === '/loads-info/create' && 'Создание новой нагрузки') || 'Расписание занятости в аудиториях(ЦИТ)'

    return <>
        {
            (pathname.includes('/class-schedule') || pathname.includes('/loads-info'))
            && <NavLink to='/' className={generalStyles.link}>В главное меню</NavLink>
        }
        <h1>{title}</h1>
    </>
}