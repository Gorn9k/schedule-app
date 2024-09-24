import React, {FC} from "react";
import {deleteSchedule219} from "../../../../../api/schedule-backend-api";
import styles from "../../../schedule/Schedule.module.css";
import stylesForInfo from "../../Schedule219Info.module.css";
import Preloader from "../../../../preloader/Preloader";

type LoadInfoEditProps = {

}

export const LoadInfoEdit: FC<LoadInfoEditProps> = () => {

    return (
        {loading && <Preloader/>}
    {!loading && error &&
    <h2 style={{
        color: 'red',
        textAlign: 'center',
        height: '80vh',
        alignContent: 'center',
        margin: '0'
    }}>{error}</h2>}
    {!loading && (schedule || props.action === 'create')
    && <>
        <h1>{props.action === "edit" ? 'Текущая нагрузка' : 'Новая нагрузка'}</h1>


    </>
    }
        {
            props.action === 'edit' && <button onClick={() => {
                setLoading(true)
                deleteSchedule219(Number(id), localStorage.getItem('authToken'))
                    .then(() => {
                        setError(null)
                        navigate(-1)
                    })
                    .catch((reason) => {
                        if (reason.response.status === 403) {
                            setShowModal(true)
                        } else
                            setError('Не удалось удалить нагрузку.')
                    })
                    .finally(() => setLoading(false))
            }} type="button" className={`${styles.button} ${stylesForInfo.formButton}`}>
                Удалить нагрузку
            </button>
        }
    )
}