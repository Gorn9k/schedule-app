import {FC, ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {FormikErrors, FormikValues} from "formik";

type FormFieldsErrorsProps = {
    setErrors: (errors: FormikErrors<FormikValues>) => void
    setFieldTouched: (field: string, isTouched?: (boolean | undefined), shouldValidate?: (boolean | undefined)) => Promise<void | FormikErrors<FormikValues>>
    children: ReactElement[] | ReactElement| null
}

export const FormFieldsErrors: FC<FormFieldsErrorsProps> = ({setFieldTouched, setErrors, children}) => {

    const formFieldsErrors = useSelector((state: RootState) => state.modal.formFieldsErrors)

    useEffect(() => {
        if (formFieldsErrors) {
            Promise.all(Object.keys(formFieldsErrors).map(value =>
                setFieldTouched(value, true))).then(() => setErrors(formFieldsErrors as FormikValues)).catch((reason) => console.log(reason))
        }
    }, [formFieldsErrors, setErrors, setFieldTouched]);

    return <>{children}</>
}