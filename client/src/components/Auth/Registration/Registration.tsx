import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        name: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })
}

export const Registration = () => {

    const onSubmit = () => {}

    return (
        <div className={styles.wrap}>
            <Formik
                initialValues={{ name: '', email: '', password: '', file: '' }}
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
                                name={'name'}
                                placeholder={'Enter your name'}
                            />
                            <InputForm
                                name={'email'}
                                type={'email'}
                                placeholder={'Enter your email'}
                            />
                            <InputForm
                                name={'password'}
                                type={'password'}
                                placeholder={'Enter your password'}
                            />
                            <InputForm
                                name={'file'}
                                type={'file'}
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || !dirty}
                            >
                                Sign up
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
