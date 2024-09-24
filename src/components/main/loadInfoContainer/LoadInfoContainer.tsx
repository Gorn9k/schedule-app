import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoadInfo} from "./loadInfo/LoadInfo";

export const LoadInfoContainer = () => {

    const navigate = useNavigate();

    return <>
        <LoadInfo/>
        <Link onClick={() => navigate(-1)} to={''}>
            Назад
        </Link>
    </>
}