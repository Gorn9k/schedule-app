import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from './MainPageNavLink.module.css';

type MainPageNavLinkProps = {
    requestParams?: Record<string, string>
    text: string
    to: string
}

export const MainPageNavLink: FC<MainPageNavLinkProps> = (props) => {

    const queryParams = new URLSearchParams(props.requestParams).toString();
    const uri = `${props.to}?${queryParams}`;

    return (
        <NavLink to={uri} className={styles.link}>{props.text}</NavLink>
    )
}