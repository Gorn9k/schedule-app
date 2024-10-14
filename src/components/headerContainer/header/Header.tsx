import React, {FC} from "react";
import generalStyles from "../../../App.module.css";
import styles from '../header/Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderProps = {
    pathname: string;
    frame: string | null
}

export const Header: FC<HeaderProps> = ({pathname, frame}) => {

    const title = (pathname === '/loads-info' && 'Расписание занятости в 219 аудитории')
        || (frame && (frame === 'FIRST' ? 'Расписание аудиторий(ЦИТ) в первом учебном корпусе' : 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'))
        || (pathname.match(/^\/loads-info\/\d+\/edit$/) && 'Редактирование нагрузки')
        || (pathname === '/loads-info/create' && 'Создание новой нагрузки') || (pathname === '/' && 'Расписание занятости в аудиториях(ЦИТ)')
        || ''

    return <header className={styles.title}>
        {
            pathname !== '/' && <NavLink to='/' className={generalStyles.link}>В главное меню</NavLink>
        }
        <h1>{title}</h1>
    </header>
}