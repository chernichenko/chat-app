import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })
}

export const ChangePassword = () => {

    const onSubmit = () => {}

    return (
        <div className={styles.wrap}>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={styles.form}>
                            <div className={styles.back}>
                                <Link to="/">Back</Link>
                            </div>
                            <InputForm
                                name={'email'}
                                type={'email'}
                                placeholder={'Enter your email'}
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

