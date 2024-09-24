import React, {FC} from 'react';
import './App.module.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Schedule from "./components/main/schedule/Schedule";
import Modal from "react-modal";
import {HeaderContainer} from "./components/headerContainer/HeaderContainer";
import {MainPageContainerLinks} from "./components/main/mainPageContainerLinks/MainPageContainerLinks";
import Schedule219Info
    from "./components/main/loadInfoContainer/Schedule219Info";

Modal.setAppElement('#root');

const App: FC = () => {

    return <>
        <Router>
            <HeaderContainer/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPageContainerLinks/>}/>
                    <Route path="/class-schedule" element={<Schedule/>}/>
                    <Route path="/loads-info" element={<Schedule/>}/>
                    <Route path="/loads-info/:id/edit" element={<Schedule219Info action={'edit'}/>}/>
                    <Route path="/loads-info/create" element={<Schedule219Info action={'create'}/>}/>
                </Routes>
            </main>
        </Router>
        <Footer/>
    </>
}

export default App;
