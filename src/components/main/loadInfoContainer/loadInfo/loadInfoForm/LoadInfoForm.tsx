import React, {FC} from "react";
import * as Yup from "yup";
import {createSchedule219, editSchedule219} from "../../../../../api/schedule-backend-api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import stylesForInfo from "../../Schedule219Info.module.css";

type LoadInfoProps = {
    renderButton: (props: { disabled: boolean }) => React.ReactNode
}

export const LoadInfoForm: FC<LoadInfoProps> = (props) => {
    return (
        <Formik
            initialValues={{
                id: schedule?.id,
                localDate: schedule?.date,
                localTime: schedule?.time,
                type: schedule?.type,
                responsible: schedule?.responsible,
                description: schedule?.description
            }}
            validationSchema={Yup.object({
                localDate: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                localTime: Yup.string()
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
                setLoading(true);
                (props.action === 'edit' ?
                    editSchedule219(values, localStorage.getItem('authToken')) :
                    createSchedule219(values, localStorage.getItem('authToken')))
                    .then(() => {
                        setError(null)
                        navigate(-1)
                    })
                    .catch((reason) => {
                        if (reason.response.status === 403) {
                            setShowModal(true)
                            setFormSchedule(values)
                        } else if (reason.response.status === 400) {
                            for (const [field, message] of Object.entries(reason.response.data as {
                                [key: string]: string
                            })) {
                                setFieldError(field, message)
                            }
                        } else
                            setError(props.action === "edit" ? 'Не удалось изменить нагрузку.' : 'Не удалось создать нагрузку.')
                    })
                    .finally(() => {
                        setLoading(false)
                        setSubmitting(false)
                    })
            }}
        >
            {({isSubmitting, errors, touched}) => (
                <Form className={stylesForInfo.formCenter}>
                    <div>
                        <label htmlFor="localDate">Дата:</label>
                        <Field name="localDate" type="date" id="localDate"
                               className={errors.localDate && touched.localDate ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="localDate" component="div"
                                      className={stylesForInfo.errorMessage}/>
                    </div>
                    <div>
                        <label htmlFor="localTime">Время:</label>
                        <Field name="localTime" type="time" id="localTime"
                               className={errors.localTime && touched.localTime ? stylesForInfo.error : ''}/>
                        <ErrorMessage name="localTime" component="div"
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
}