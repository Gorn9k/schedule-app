import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import styles from './../mainPageNavLink/MainPageNavLink.module.css';

type MainPageNavLinkProps = {
    requestParams?: Record<string, string>
    text: string
    to: string
}

export const MainPageNavLink: FC<MainPageNavLinkProps> = (props) => {

    const currentWeekPeriod = useSelector((state: RootState) => state.currentWeekPeriod);
    const queryParams = new URLSearchParams(
        {
            startDate: new Date(currentWeekPeriod.startDateTime).toLocaleDateString('en-CA'),
            endDate: new Date(currentWeekPeriod.endDateTime).toLocaleDateString('en-CA'),
            ...props.requestParams
        }).toString();
    const uri = `${props.to}?${queryParams}`;

    return (
        <NavLink to={uri} className={styles.link}>{props.text}</NavLink>
    )
}