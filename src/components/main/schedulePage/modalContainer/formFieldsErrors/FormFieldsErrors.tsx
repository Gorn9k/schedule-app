import {FC, ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";

type FormFieldsErrorsProps = {
    setFieldError: (field: string, message: (string | undefined)) => void
    children: ReactElement | null
}

export const FormFieldsErrors: FC<FormFieldsErrorsProps> = ({setFieldError, children}) => {

    const formFieldsErrors = useSelector((state: RootState) => state.modal.formFieldsErrors)

    useEffect(() => {
        formFieldsErrors && formFieldsErrors.forEach(element =>
            setFieldError(element.field, element.errorMessage))
    }, []);

    return children
}