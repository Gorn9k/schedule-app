import React, {useEffect} from "react";
import {generateEndDateMilliseconds, generateStartDateMilliseconds} from "../../../utils/dates";
import {MainPage} from "./mainPage/MainPage";

type CurrentWeekPeriod = {
    startDateTime: number
    endDateTime: number
}

export const MainPageContainer = () => {

    const [currentWeekPeriod, setCurrentWeekPeriod] =
        React.useState<CurrentWeekPeriod>(
            {
                startDateTime: generateStartDateMilliseconds(),
                endDateTime: generateEndDateMilliseconds()
            }
        );

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentWeekPeriod({
                startDateTime: generateStartDateMilliseconds(),
                endDateTime: generateEndDateMilliseconds()
            })
        }, 100);

        return () => clearInterval(timerId);
    }, []);

    return <MainPage startDateTime={currentWeekPeriod.startDateTime} endDateTime={currentWeekPeriod.endDateTime}/>
}