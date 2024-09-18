import React, {FC, useEffect} from 'react';
import styles from './MainPage.module.css';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {reset} from "../../redux/scheduleSlice";
import {MainPageNavLink} from "./mainPageNavLink/MainPageNavLink";
import generalStyles from './../../App.module.css'

const MainPage: FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // console.log(`Date changed ${currentDate}`)
        const timerId = setInterval(() => {
            dispatch(reset())
        }, 100);

        return () => clearInterval(timerId);
    }, [dispatch]);

    return (
        <>
            <header className={generalStyles.title}>
                Расписание занятости в аудиториях(ЦИТ)
            </header>

            <main className={styles.content}>
                <div className={styles.containerLinks}>
                    <p className={styles.paragraph}>
                        <MainPageNavLink to={`/class-schedule`}
                                         text={'Расписание аудиторий в 1-ом учебном корпусе'}
                                         requestParams={{frame: 'FIRST'}}/>
                    </p>
                    <p className={styles.paragraph}>
                        <MainPageNavLink to={`/class-schedule`}
                                         text={'Расписание аудиторий в 4-ом учебном корпусе'}
                                         requestParams={{frame: 'FOURTH'}}/>
                    </p>
                    <p className={styles.paragraph}>
                        <MainPageNavLink to={`/loads-info`}
                                         text={'Расписание занятости в 219 аудитории'}/>
                    </p>
                </div>
            </main>
        </>
    )
}

export default MainPage;
