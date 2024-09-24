import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {LoadInfoEdit} from "./loadInfoEdit/LoadInfoEdit";
import {LoadInfoCreate} from "./loadInfoCreate/LoadInfoCreate";

type LoadInfoProps = {}

export const LoadInfo: FC<LoadInfoProps> = () => {

    const {id} = useParams();

    return <>
        {
            (id && <LoadInfoEdit/>)
            || <LoadInfoCreate/>
        }
    </>
}