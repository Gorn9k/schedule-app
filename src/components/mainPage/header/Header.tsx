import generalStyles from "../../../App.module.css";
import React, {FC, ReactNode} from "react";

type HeaderProps = {
    children: ReactNode | ReactNode[];
}

export const Header: FC<HeaderProps> = (props) => {

    return (
        <header className={generalStyles.title}>
            {props.children}
        </header>
    )
}