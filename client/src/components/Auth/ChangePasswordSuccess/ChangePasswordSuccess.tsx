import { useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { InputForm, Button } from 'components'

import styles from '../Auth.module.scss'

const validationSchema = () => {
    return Yup.object({
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
    })
}

type submitValue = {
    readonly password: string
}

export const ChangePasswordSuccess = () => {
    const history = useHistory()
    const params: any = useParams()
    const token = useMemo(() => params.token, [params])

    const onSubmit = async ({ password }: submitValue) => {
        try {
            const { data }: any = await axios.post('/api/auth/reset/finished', { password, token })
            toast(data.message)
            history.push(`/`)
        } catch(e) {
            toast.error(e.message)
        }
    }

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

