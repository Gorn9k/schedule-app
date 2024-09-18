import React, {FC} from 'react';
import styles from './MainPage.module.css';
import generalStyles from './../../App.module.css'
import {MainPageContainerLinks} from "./mainPageContainerLinks/MainPageContainerLinks";
import {Header} from "./header/Header";

const MainPage: FC = () => {

    return (
        <>
            <Header>
                Расписание занятости в аудиториях(ЦИТ)
            </Header>

            <main className={styles.content}>
                <MainPageContainerLinks/>
            </main>
        </>
    )
}

export default MainPage;
