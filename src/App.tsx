import React, {FC} from 'react';
import './App.module.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainPage/MainPage";
import Schedule from "./components/mainPage/schedule/Schedule";
import Schedule219 from './components/mainPage/schedule219/Schedule219';
import Schedule219Info from "./components/mainPage/schedule219/scheduleTable219/schedule219Info/Schedule219Info";

const App : FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/schedule/219" element={<Schedule219 />} />
                <Route path="/schedule/219/load-info/:id/edit" element={<Schedule219Info action={'edit'}/>} />
                <Route path="/schedule/219/load-info/:id/create" element={<Schedule219Info action={'create'}/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
