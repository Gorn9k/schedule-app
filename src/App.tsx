import React, {FC} from 'react';
import styles from './App.module.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {SchedulePageContainer} from "./components/main/schedulePageContainer/SchedulePage";
import Modal from "react-modal";
import {WithFrameHeader} from "./components/headerScheduleContainer/HeaderScheduleContainer";
import {MainPageContainer} from "./components/main/mainPageContainer/MainPageContainer";
import {LoadInfoContainer} from "./components/main/loadInfoContainer/LoadInfoContainer";
import {NotFound} from "./components/main/notFound/NotFound";
import {useLocationParamsValidatorReduxSetter} from "./hooks/useLocationParamsValidatorReduxSetter";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {resetScheduleState} from "./redux/scheduleSlice";
import {Header} from "./components/headerScheduleContainer/header/Header";

Modal.setAppElement('#root');

const MemoizedApp = React.memo(() => {

    const dispatch = useDispatch<AppDispatch>();

    const MainPageLink = () =>
        <NavLink to='/' onClick={() => dispatch(resetScheduleState())} className={styles.link}>В главное меню</NavLink>

    return <>
        <header>
            <Routes>
                <Route path="/" element={<Header title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
                <Route path="/class-schedule" element={<WithFrameHeader/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info" element={<Header title={'Расписание занятости в 219 аудитории'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info/:id/edit" element={<Header title={'Редактирование нагрузки'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info/create" element={<Header title={'Создание новой нагрузки'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="*" element={<Header title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
            </Routes>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<MainPageContainer/>}/>
                <Route path="/class-schedule" element={<SchedulePageContainer/>}/>
                <Route path="/loads-info" element={<SchedulePageContainer/>}/>
                <Route path="/loads-info/:id/edit" element={<LoadInfoContainer/>}/>
                <Route path="/loads-info/create" element={<LoadInfoContainer/>}/>
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