import React, {FC} from "react";
import {LoadInfoForm} from "../loadInfoForm/LoadInfoForm";
import styles from "../../../schedule/Schedule.module.css";
import stylesForInfo from "../../Schedule219Info.module.css";

type LoadInfoCreateProps = {}

export const LoadInfoCreate: FC<LoadInfoCreateProps> = () => {

    return <>
        <h1>Новая нагрузка</h1>
        <LoadInfoForm renderButton={
            (props: { disabled: boolean }) =>
                <button type="submit" disabled={props.disabled}
                        className={`${styles.button} ${stylesForInfo.formButton}`}>Создать</button>
        }/>
    </>
}