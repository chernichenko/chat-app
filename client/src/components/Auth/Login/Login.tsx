import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })
}

export const Login = () => {

    const onSubmit = (values: any) => {
        // const { email, password } = values;

        try {
            
        } catch(e) {
            toast.error(e)
        }
    }

    return (
        <div className={styles.wrap}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={styles.form}>
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

                            <div className={styles.forgot}>
                                <Link to="/password">Forgot your password?</Link>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || !dirty}
                                type={'submit'}
                            >
                                Sign in
                            </Button>

                            <div className={styles.bottom}>
                                <p>Don't have an account?</p>
                                <Link to="/registration">Registration</Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
