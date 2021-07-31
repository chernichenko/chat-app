import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
    })
}

export const ChangePasswordSuccess = () => {

    const onSubmit = () => {}

    return (
        <div className={styles.wrap}>
            <Formik
                initialValues={{ password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={styles.form}>
                            <InputForm
                                name={'password'}
                                type={'password'}
                                placeholder={'Enter new password'}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || !dirty}
                            >
                                Confirm
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

