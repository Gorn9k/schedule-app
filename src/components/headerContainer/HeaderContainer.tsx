import {useLocation} from 'react-router-dom';
import React from "react";
import {Header} from "./header/Header";

export const HeaderContainer = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const frame = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null;

    return <Header pathname={location.pathname} frame={frame}/>
}