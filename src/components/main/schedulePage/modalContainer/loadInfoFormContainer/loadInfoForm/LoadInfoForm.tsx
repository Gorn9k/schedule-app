import React, {FC} from "react";
import {LoadInfo} from "../../../../../../api/schedule-backend-api";
import {ErrorMessage, Field, Form, FormikErrors, FormikTouched} from "formik";
import generalStyles from "../../../../../../App.module.css";

type LoadInfoProps = {
    isSubmitting: boolean
    errors: FormikErrors<LoadInfo>
    touched: FormikTouched<LoadInfo>
    renderButton: (disabled: boolean) => React.ReactNode;
}

export const LoadInfoForm: FC<LoadInfoProps> = ({isSubmitting, errors, touched, renderButton}) => {
    return <Form>
        <div>
            <label htmlFor="date">Дата:</label>
            <Field name="date" type="date" id="date"
                   className={errors.date && touched.date ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name="date" component="div"
                      className={generalStyles.errorMessage}/>
        <div>
            <label htmlFor="time">Время:</label>
            <Field name="time" type="time" id="time"
                   className={errors.time && touched.time ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name="time" component="div"
                      className={generalStyles.errorMessage}/>
        <div>
            <label htmlFor="type">Тип:</label>
            <Field name="type" type="text" id="type"
                   className={errors.type && touched.type ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name="type" component="div" className={generalStyles.errorMessage}/>
        <div>
            <label htmlFor="responsible">Ответственный:</label>
            <Field name="responsible" type="text" id="responsible"
                   className={errors.responsible && touched.responsible ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name="responsible" component="div"
                      className={generalStyles.errorMessage}/>
        <div>
            <label htmlFor="description">Комментарий:</label>
            <Field name="description" type="text" id="description" component="textarea"
                   className={errors.description && touched.description ? generalStyles.error : undefined}/>
        </div>
        <ErrorMessage name="description" component="div"
                      className={generalStyles.errorMessage}/>
        {renderButton(isSubmitting)}
    </Form>
}