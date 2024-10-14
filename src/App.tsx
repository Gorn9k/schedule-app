import React, {FC} from 'react';
import './App.module.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/footer/Footer";
import ScheduleContainer from "./components/main/scheduleContainer/ScheduleContainer";
import Modal from "react-modal";
import {HeaderContainer} from "./components/headerContainer/HeaderContainer";
import {MainPageContainer} from "./components/main/mainPageContainer/MainPageContainer";
import {LoadInfoContainer} from "./components/main/loadInfoContainer/LoadInfoContainer";

Modal.setAppElement('#root');

const App: FC = () => {

    return <>
        <Router>
            <HeaderContainer/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPageContainer/>}/>
                    <Route path="/class-schedule" element={<ScheduleContainer/>}/>
                    <Route path="/loads-info" element={<ScheduleContainer/>}/>
                    <Route path="/loads-info/:id/edit" element={<LoadInfoContainer/>}/>
                    <Route path="/loads-info/create" element={<LoadInfoContainer/>}/>
                </Routes>
            </main>
        </Router>
        <Footer/>
    </>
}

export default App