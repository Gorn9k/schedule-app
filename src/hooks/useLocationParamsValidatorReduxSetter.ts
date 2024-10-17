import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {FrameType, setEndDateTime, setFrame, setStartDateTime} from "../redux/scheduleSlice";
import {useEffect} from "react";

export const useLocationParamsValidatorReduxSetter = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        let badLocationParams: boolean

        switch (location.pathname) {
            case '/class-schedule': {
                const startDateParam = params.get("startDate")
                const endDateParam = params.get("endDate")
                const frameParam = params.get("frame")

                const startDate = (startDateParam && new Date(startDateParam)) || null
                const endDate = (endDateParam && new Date(endDateParam)) || null

                badLocationParams = params.size !== 3 || !frameParam || !startDate || !endDate || isNaN(startDate.valueOf())
                    || isNaN(endDate.valueOf()) || startDate > endDate || (frameParam !== 'FIRST' && frameParam !== 'FOURTH')

                if (!badLocationParams) {
                    dispatch(setStartDateTime((startDate as Date).getTime()))
                    dispatch(setEndDateTime((endDate as Date).getTime()))
                    dispatch(setFrame(frameParam as FrameType))
                }
                break
            }
            case '/loads-info': {
                const startDateParam = params.get("startDate")
                const endDateParam = params.get("endDate")

                const startDate = (startDateParam && new Date(startDateParam)) || null
                const endDate = (endDateParam && new Date(endDateParam)) || null

                badLocationParams = params.size !== 2 || !startDate || !endDate || isNaN(startDate.valueOf())
                    || isNaN(endDate.valueOf()) || startDate > endDate

                if (!badLocationParams) {
                    dispatch(setStartDateTime((startDate as Date).getTime()))
                    dispatch(setEndDateTime((endDate as Date).getTime()))
                }
                break
            }
            default:
                badLocationParams = params.size !== 0
                break
        }

        badLocationParams && navigate('/')
    }, [location]);
}