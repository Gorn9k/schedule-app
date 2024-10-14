import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect} from "react";
import {Header} from "./header/Header";

export const HeaderContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const frame = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null;
    const badRequest = frame && (frame !== 'FIRST' && frame !== 'FOURTH')

    badRequest && navigate('/')

    return (!badRequest &&
        <Header pathname={location.pathname} frame={frame}/>
    ) || null
}