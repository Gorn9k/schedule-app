import React, {FC, memo} from "react";
import * as Yup from "yup";
import {Schedule219} from "../../../../../api/schedule-backend-api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import generalStyles from "../../../../../App.module.css";

type LoadInfoProps = {
    renderButton: (props: { disabled: boolean }) => React.ReactNode
    onSubmit: (values: Schedule219, setSubmitting: (isSubmitting: boolean) => void,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
    schedule?: Schedule219
}

export const LoadInfoForm: FC<LoadInfoProps> = memo((props) => {
    return (
        <Formik
            initialValues={{
                id: props.schedule?.id,
                date: props.schedule?.date || '',
                time: props.schedule?.time || '',
                type: props.schedule?.type || '',
                responsible: props.schedule?.responsible || '',
                description: props.schedule?.description || ''
            }}
            validationSchema={Yup.object({
                date: Yup.string()
                    .required('Поле не может быть пустым'),
                time: Yup.string()
                    .required('Поле не может быть пустым'),
                type: Yup.string()
                    .max(60, 'Максимальное кол-во символов должно быть равно 60')
                    .required('Поле не может быть пустым'),
                responsible: Yup.string()
                    .max(40, 'Максимальное кол-во символов должно быть равно 40')
                    .required('Поле не может быть пустым'),
                description: Yup.string()
                    .max(1000, 'Максимальное кол-во символов должно быть равно 1000')
                    .required('Поле не может быть пустым')
            })}
            onSubmit={(values, {setSubmitting, setFieldError}) => {
                props.onSubmit(values, setSubmitting, setFieldError)
            }}
        >
            {({isSubmitting, errors, touched}) => (
                <Form>
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
                    {props.renderButton({disabled: isSubmitting})}
                </Form>
            )}
        </Formik>
    )
})