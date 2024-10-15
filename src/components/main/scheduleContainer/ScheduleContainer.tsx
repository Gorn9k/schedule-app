import React, {FC, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {Schedule} from "./schedule/Schedule";

const ScheduleContainer: FC = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const navigate = useNavigate();

    const startDateParam = queryParams.get('startDate')
    const endDateParam = queryParams.get('endDate')
    const frameParam = queryParams.get('frame') as 'FIRST' | 'FOURTH' | null

    const startDate = (startDateParam && new Date(startDateParam)) || null
    const endDate = (endDateParam && new Date(endDateParam)) || null

    const badRequest = !startDate || isNaN(startDate.valueOf()) || !endDate || isNaN(endDate.valueOf())
        || startDate > endDate || (location.pathname === '/class-schedule' && !frameParam)
        || (frameParam && location.pathname !== '/class-schedule') || (frameParam && frameParam !== 'FIRST' && frameParam !== 'FOURTH')

    useEffect(() => {
        badRequest && navigate('/')
    }, [badRequest, navigate]);

    return (!badRequest && <Schedule startDate={startDate} endDate={endDate} frame={frameParam}/>) || null
}

export default ScheduleContainer;
