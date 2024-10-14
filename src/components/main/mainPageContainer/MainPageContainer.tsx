import React, {useEffect} from "react";
import {generateCurrentEndDateMilliseconds, generateCurrentStartDateMilliseconds} from "../../../utils/dates";
import {MainPage} from "./mainPage/MainPage";

type CurrentWeekPeriod = {
    startDateTime: number
    endDateTime: number
}

export const MainPageContainer = () => {

    const [currentWeekPeriod, setCurrentWeekPeriod] =
        React.useState<CurrentWeekPeriod>(
            {
                startDateTime: generateCurrentStartDateMilliseconds(),
                endDateTime: generateCurrentEndDateMilliseconds()
            }
        );

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentWeekPeriod({
                startDateTime: generateCurrentStartDateMilliseconds(),
                endDateTime: generateCurrentEndDateMilliseconds()
            })
        }, 100);

        return () => clearInterval(timerId);
    }, []);

    return <MainPage startDateTime={currentWeekPeriod.startDateTime} endDateTime={currentWeekPeriod.endDateTime}/>
}