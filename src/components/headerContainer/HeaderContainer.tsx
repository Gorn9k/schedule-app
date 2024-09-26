import {useLocation, useNavigate, NavLink} from 'react-router-dom';

import styles from '../main/schedule/Schedule.module.css';
import {Header} from "./header/Header";
import {useEffect} from "react";

export const HeaderContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const frame = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null;
    const badRequest = frame && (frame !== 'FIRST' && frame !== 'FOURTH')

    useEffect(() => {
        badRequest && navigate('/');
    }, [badRequest, navigate]);

    const title = (location.pathname === '/loads-info' && 'Расписание занятости в 219 аудитории')
        || (frame && (frame === 'FIRST' ? 'Расписание аудиторий(ЦИТ) в первом учебном корпусе' : 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе'))
        || (location.pathname.match(/^\/loads-info\/\d+\/edit$/) && 'Редактирование нагрузки')
        || (location.pathname === '/loads-info/create' && 'Создание новой нагрузки') || (location.pathname === '/' && 'Расписание занятости в аудиториях(ЦИТ)')
        || ''

    return (
        (!badRequest &&
            <Header title={title}>
                {
                    location.pathname !== '/' && <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                }
            </Header>)
        || null
    );
};