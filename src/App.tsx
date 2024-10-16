import React, {FC} from 'react';
import styles from './App.module.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import ScheduleContainer from "./components/main/scheduleContainer/ScheduleContainer";
import Modal from "react-modal";
import {HeaderContainer} from "./components/headerContainer/HeaderContainer";
import {MainPageContainer} from "./components/main/mainPageContainer/MainPageContainer";
import {LoadInfoContainer} from "./components/main/loadInfoContainer/LoadInfoContainer";
import {NotFound} from "./components/main/notFound/NotFound";
import {useLocationParamsValidatorReduxSetter} from "./hooks/useLocationParamsValidatorReduxSetter";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {resetScheduleState} from "./redux/scheduleSlice";

Modal.setAppElement('#root');

const MemoizedApp = React.memo(() => {

    const dispatch = useDispatch<AppDispatch>();

    const MainPageLink = () =>
        <NavLink to='/' onClick={() => dispatch(resetScheduleState())} className={styles.link}>В главное меню</NavLink>

    console.log(123)
    return <>
        <header>
            <Routes>
                <Route path="/" element={<HeaderContainer title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
                <Route path="/class-schedule" element={<HeaderContainer/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info" element={<HeaderContainer title={'Расписание занятости в 219 аудитории'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info/:id/edit" element={<HeaderContainer title={'Редактирование нагрузки'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="/loads-info/create" element={<HeaderContainer title={'Создание новой нагрузки'}/>}>
                    <Route index element={<MainPageLink/>}/>
                </Route>
                <Route path="*" element={<HeaderContainer title={'Расписание занятости в аудиториях(ЦИТ)'}/>}/>
            </Routes>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<MainPageContainer/>}/>
                <Route path="/class-schedule" element={<ScheduleContainer/>}/>
                <Route path="/loads-info" element={<ScheduleContainer/>}/>
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