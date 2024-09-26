import React, {FC, memo} from "react";
import * as Yup from "yup";
import {Schedule219} from "../../../../api/schedule-backend-api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import stylesForInfo from "../Schedule219Info.module.css";

type LoadInfoProps = {
    renderButton: (props: { disabled: boolean }) => React.ReactNode
    onSubmit: (values: Schedule219, setSubmitting: (isSubmitting: boolean) => void,
               setFieldError: (field: string, message: (string | undefined)) => void) => void
    schedule?: Schedule219
}

export const LoadInfoForm: FC<LoadInfoProps> = memo((props) => {
    console.log('Load Info Form');
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
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                time: Yup.string()
                    .required('Required'),
                type: Yup.string()
                    .max(60)
                    .required(),
                responsible: Yup.string()
                    .max(40)
                    .required(),
                description: Yup.string()
                    .max(1000)
                    .required()
            })}
            onSubmit={(values, {setSubmitting, setFieldError}) => {
                props.onSubmit(values, setSubmitting, setFieldError)
            }}
        >
            {({isSubmitting, errors, touched}) => (
                <Form className={stylesForInfo.formCenter}>
                    <div>
                        <label htmlFor="date">Дата:</label>
                        <Field name="date" type="date" id="date"
                               className={errors.date && touched.date ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="date" component="div"
                                      className={stylesForInfo.errorMessage}/>
                    </div>
                    <div>
                        <label htmlFor="time">Время:</label>
                        <Field name="time" type="time" id="time"
                               className={errors.time && touched.time ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="time" component="div"
                                      className={stylesForInfo.errorMessage}/>
                    </div>
                    <div>
                        <label htmlFor="type">Тип:</label>
                        <Field name="type" type="text" id="type"
                               className={errors.type && touched.type ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="type" component="div" className={stylesForInfo.errorMessage}/>
                    </div>
                    <div>
                        <label htmlFor="responsible">Ответственный:</label>
                        <Field name="responsible" type="text" id="responsible"
                               className={errors.responsible && touched.responsible ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="responsible" component="div"
                                      className={stylesForInfo.errorMessage}/>
                    </div>
                    <div>
                        <label htmlFor="description">Комментарий:</label>
                        <Field name="description" type="text" id="description" component="textarea"
                               className={errors.description && touched.description ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="description" component="div"
                                      className={stylesForInfo.errorMessage}/>
                    </div>
                    {props.renderButton({disabled: isSubmitting})}
                </Form>
            )}
        </Formik>
    )
})