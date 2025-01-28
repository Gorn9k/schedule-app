import React, {FC} from "react";
import {Outlet} from 'react-router-dom'

type HeaderProps = {
    title: string
}

export const Header: FC<HeaderProps> = ({title}) => {

    return <>
        <Outlet/>
        <h1>{title}</h1>
    </>
}