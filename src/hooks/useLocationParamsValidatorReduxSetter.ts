import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {
    fetchLoadsInfo,
    fetchSchedule,
    FrameType,
    setEndDateTime,
    setFrame,
    setStartDateTime
} from "../redux/scheduleSlice";
import {useEffect} from "react";

export const useLocationParamsValidatorReduxSetter = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const badLocationParams = (() => {
            switch (location.pathname) {
                case '/classes-schedule': {
                    const startDateParam = params.get("startDate")
                    const endDateParam = params.get("endDate")
                    const frameParam = params.get("frame")

                    const startDate = (startDateParam && new Date(startDateParam)) || null
                    const endDate = (endDateParam && new Date(endDateParam)) || null

                    const badLocationParams = params.size !== 3 || !frameParam || !startDate || !endDate || isNaN(startDate.valueOf())
                        || isNaN(endDate.valueOf()) || startDate > endDate || (frameParam !== 'FIRST' && frameParam !== 'FOURTH')

                    if (!badLocationParams) {
                        dispatch(setStartDateTime((startDate as Date).getTime()))
                        dispatch(setEndDateTime((endDate as Date).getTime()))
                        dispatch(setFrame(frameParam as FrameType))
                        dispatch(fetchSchedule(
                            {
                                startDate: startDate.toLocaleDateString('en-CA'),
                                endDate: endDate.toLocaleDateString('en-CA'),
                                frame: frameParam
                            }
                        ))
                    }
                    return badLocationParams
                }
                case '/loads-info-schedule': {
                    const startDateParam = params.get("startDate")
                    const endDateParam = params.get("endDate")

                    const startDate = (startDateParam && new Date(startDateParam)) || null
                    const endDate = (endDateParam && new Date(endDateParam)) || null

                    const badLocationParams = params.size !== 2 || !startDate || !endDate || isNaN(startDate.valueOf())
                        || isNaN(endDate.valueOf()) || startDate > endDate

                    if (!badLocationParams) {
                        dispatch(setStartDateTime((startDate as Date).getTime()))
                        dispatch(setEndDateTime((endDate as Date).getTime()))
                        dispatch(setFrame(undefined))
                        dispatch(fetchLoadsInfo(
                            {
                                startDate: startDate.toLocaleDateString('en-CA'),
                                endDate: endDate.toLocaleDateString('en-CA')
                            }
                        ))
                    }
                    return badLocationParams
                }
                default:
                    return params.size !== 0
            }
        })()

        badLocationParams && navigate('/')
    }, [dispatch, location, navigate]);
}