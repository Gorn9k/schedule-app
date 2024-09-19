import { useLocation, useNavigate, NavLink } from 'react-router-dom';

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
    }, []);

    const title = (!frame && 'Расписание занятости в 219 аудитории')
        || (frame === 'FIRST' && 'Расписание аудиторий(ЦИТ) в первом учебном корпусе')
        || 'Расписание аудиторий(ЦИТ) в четвертом учебном корпусе';

    return (
        !badRequest && <Header>
            {location.pathname === '/' && 'Расписание занятости в аудиториях(ЦИТ)'}
            {location.pathname === '/class-schedule' && (
                <>
                    <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                    {title}
                </>
            )}
            {location.pathname === '/loads-info' && (
                <>
                    <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                    {title}
                </>
            )}
            {location.pathname === '/loads-info/:id/edit' && (
                <>
                    <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                    {'Редактирование нагрузки'}
                </>
            )}
            {location.pathname === '/loads-info/create' && (
                <>
                    <NavLink to='/' className={styles.link}>В главное меню</NavLink>
                    {'Создание новой нагрузки'}
                </>
            )}
        </Header> || null
    );
};