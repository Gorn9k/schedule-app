import React, {FC} from 'react';
import styles from './App.module.css';
import generalStyles from './App.module.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {SchedulePage} from "./components/main/schedulePage/SchedulePage";
import Modal from "react-modal";
import {WithFrameHeader} from "./components/headerScheduleContainer/HeaderScheduleContainer";
import {MainPageContainer} from "./components/main/mainPageContainer/MainPageContainer";
import {NotFound} from "./components/main/notFound/NotFound";
import {useLocationParamsValidatorReduxSetter} from "./hooks/useLocationParamsValidatorReduxSetter";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {resetScheduleState} from "./redux/scheduleSlice";
import {Header} from "./components/headerScheduleContainer/header/Header";
import {setShowLoadInfoModal} from "./redux/modalSlice";
import {ModalContainer} from "./components/main/schedulePage/modalContainer/ModalContainer";

Modal.setAppElement('#root');

const MemoizedApp = React.memo(() => {

    const dispatch = useDispatch<AppDispatch>();

    const MainPageLink = () =>
        <NavLink to='/' onClick={() => dispatch(resetScheduleState())} className={styles.link}>В главное меню</NavLink>

    return <>
        <header>
            <Routes>
                <Route path="/" element={<Header title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
                <Route path="/classes-schedule" element={<WithFrameHeader/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info-schedule" element={<Header title={'Расписание занятости в 219 аудитории'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="*" element={<Header title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
            </Routes>
        </header>
        <main>
            <Routes>
                <Route path="/" element={
                    <div className={styles.containerLinks}>
                        <MainPageContainer/>
                    </div>
                }/>
                <Route path="/classes-schedule" element={<SchedulePage/>}/>
                <Route path="/loads-info-schedule" element={<SchedulePage/>}>
                    <Route index element={
                        <>
                            <button onClick={() => dispatch(setShowLoadInfoModal(true))}
                                    className={`${generalStyles.button} ${generalStyles.formButton} ${styles.addLoadInfoLink}`}>
                                Добавить нагрузку
                            </button>
                            <ModalContainer/>
                        </>
                    }/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </main>

        <footer>
            <p>Copyright © 2024 | Все права защищены, Поддержка веб-сервиса <a href='https://cit.vstu.by/'
                                                                               target='_blank'
                                                                               rel='noopener noreferrer'>cit.vstu.by</a>
            </p>
        </footer>
    </>
})

const App: FC = () => {

    useLocationParamsValidatorReduxSetter()

    return <MemoizedApp/>
}

export default App