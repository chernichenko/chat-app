import { Link, useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
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
    const history = useHistory()

    const onSubmit = async (values: any) => {
        try {
            const { data }: any = await axios.post('/api/auth/reset', values)
            toast(data.message)
            history.push(`/`)
        } catch(e) {
            toast.error(e.message)
        }
    }

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

