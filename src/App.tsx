import React, {FC, useMemo} from 'react';
import './App.module.css';
import {Route, Routes} from 'react-router-dom';
import ScheduleContainer from "./components/main/scheduleContainer/ScheduleContainer";
import Modal from "react-modal";
import {HeaderContainer} from "./components/headerContainer/HeaderContainer";
import {MainPageContainer} from "./components/main/mainPageContainer/MainPageContainer";
import {LoadInfoContainer} from "./components/main/loadInfoContainer/LoadInfoContainer";
import {NotFound} from "./components/main/notFound/NotFound";

Modal.setAppElement('#root');

const App: FC = () => {

    return useMemo(() => {
        return <>
            <header>
                <HeaderContainer/>
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
    }, [])
}

export default App