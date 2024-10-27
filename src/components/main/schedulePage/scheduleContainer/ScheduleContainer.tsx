import React, {FC} from "react";
import generalStyles from '../../../../App.module.css'
import Preloader from "../../../preloader/Preloader";
import {ScheduleTableContainer} from "./scheduleTableContainer/ScheduleTableContainer";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export const ScheduleContainer: FC = () => {

    const errorMessage = useSelector((state: RootState) => state.schedule.errorMessage)
    const isLoading = useSelector((state: RootState) => state.schedule.isLoading)

    // const fetchData = useCallback(() => {
    //     const requestId = ++requestIdRef.current;
    //     setIsLoading(true)
    //     setErrorMessage(null)
    //     const fetchSchedule = () => {
    //         return ((props.frame &&
    //                 getSchedule(props.startDate.toLocaleDateString('en-CA'),
    //                     props.endDate.toLocaleDateString('en-CA'),
    //                     props.frame))
    //             || getSchedule219(props.startDate.toLocaleDateString('en-CA'),
    //                 props.endDate.toLocaleDateString('en-CA')))
    //     }
    //
    //     fetchSchedule()
    //         .then((data) => {
    //             if (requestId === requestIdRef.current)
    //                 setSchedule(data);
    //         })
    //         .catch((reason) => {
    //             if (requestId === requestIdRef.current) {
    //                 console.log(reason)
    //                 setErrorMessage('Не удалось получить расписание из диспетчерской.')
    //             }
    //         })
    //         .finally(() => {
    //             if (requestId === requestIdRef.current)
    //                 setIsLoading(false)
    //         })
    // }, [props])

    return (
        (errorMessage &&
            <div className={generalStyles.noFetchDataBlock}>
                <h2 style={{
                    color: 'red'
                }}>{errorMessage}</h2>
                {/*<button onClick={fetchData} className={generalStyles.link}>{'Повторить попытку'}</button>*/}
            </div>
        )
        || (isLoading
            && <Preloader/>
        )
        // || ((((schedule as Schedule).schedules && (Object.keys((schedule as Schedule).schedules).length === 0))
        //         || Object.keys(schedule as Schedule219[]).length === 0) &&
        //     <h2 style={{
        //         textAlign: 'center',
        //         height: '100%',
        //         alignContent: 'center'
        //     }}>{'На этой неделе расписания нет.'}</h2>
        // )
        || <ScheduleTableContainer/>
    )
}