import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const LocationParamsValidatorReduxSetter = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    const startDateParam = params.get("startDate")
    const endDateParam = params.get("endDate")
    const frameParam = params.get("frame")

    const startDate = (startDateParam && new Date(startDateParam)) || null
    const endDate = (endDateParam && new Date(endDateParam)) || null

    let badLocationParams: boolean

    switch (location.pathname) {
        case '/class-schedule':
            badLocationParams = params.size !== 3 || !frameParam || !startDate || !endDate || isNaN(startDate.valueOf())
                || isNaN(endDate.valueOf()) || startDate > endDate || (frameParam !== 'FIRST' && frameParam !== 'FOURTH')
            break
        case '/loads-info':
            badLocationParams = params.size !== 2 || !startDate || !endDate || isNaN(startDate.valueOf())
                || isNaN(endDate.valueOf()) || startDate > endDate
            break
        default:
            badLocationParams = params.size !== 0
            break
    }

    useEffect(() => {
        badLocationParams && navigate('/')
    }, [badLocationParams, navigate]);
    
    return [badLocationParams, params]

}