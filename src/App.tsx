import React, {FC} from 'react';
import './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import MainPage from "./components/mainPage/MainPage";
import Schedule from "./components/mainPage/schedule/Schedule";

const App : FC = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/schedule" element={<Schedule />} />
                {/*<Route path="/" element={<Home />} />*/}
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
