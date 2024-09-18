import React, {FC} from 'react';
import './App.module.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainPage/MainPage";
import Schedule from "./components/mainPage/schedule/Schedule";
import Schedule219Info
    from "./components/mainPage/schedule/scheduleMain/scheduleTable/scheduleTableBody/scheduleTableBodyLoadsInfo/scheduleLoadInfo/Schedule219Info";
import Modal from "react-modal";

Modal.setAppElement('#root');

const App : FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/class-schedule" element={<Schedule />} />
                <Route path="/loads-info" element={<Schedule />} />
                <Route path="/loads-info/:id/edit" element={<Schedule219Info action={'edit'}/>} />
                <Route path="/loads-info/create" element={<Schedule219Info action={'create'}/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
