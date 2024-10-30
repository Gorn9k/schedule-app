import {FC, ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {FormikErrors, FormikTouched} from "formik";

type FormFieldsErrorsProps = {
    setErrors: (errors: FormikErrors<{
        login: string,
        password: string,
        incorrectLoginOrPasswordError: string
    }>) => void
    setTouched: (touched: FormikTouched<{
        login: string
        password: string
        incorrectLoginOrPasswordError: string
    }>, shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<{
        login: string,
        password: string,
        incorrectLoginOrPasswordError: string
    }>>
    children: ReactElement | null
}

export const FormFieldsErrors: FC<FormFieldsErrorsProps> = ({setTouched, setErrors, children}) => {

    const formFieldsErrors = useSelector((state: RootState) => state.modal.formFieldsErrors)

    useEffect(() => {
       if (formFieldsErrors){
           const touched = async () =>
               await setTouched({incorrectLoginOrPasswordError: true})
           touched().then(() => setErrors(formFieldsErrors)).catch((reason) => console.log(reason))
       }
    }, [formFieldsErrors, setErrors]);

    return children
}