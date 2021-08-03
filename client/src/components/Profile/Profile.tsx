import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import cn from 'classnames'
import * as Yup from 'yup'
import axios from 'axios'
import { InputForm, Button } from 'components'
import { changeUser } from 'redux/reducers/userSlice'
import { SAVE_STATE } from 'redux/actions'
import { getUser } from 'redux/selectors'

import authStyles from 'components/Auth/Auth.module.scss'
import styles from './Profile.module.scss'

const validationSchema = () => {
    return Yup.object({
        name: Yup.string()
            .min(3, 'Too Short!')
            .required('Required'),
    })
}

type submitValues = {
    readonly name: string
    readonly file: any
}

export const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { token, name } = useSelector(getUser)

    const [file, setFile] = useState<any>()

    const config = useMemo(() => ({
        headers: {
            "auth": `Che ${token}`,
        }
    }), [token])

    const onSubmit = async (values: submitValues) => {
        try {
            let formData = new FormData()
            formData.append('name', values.name)
            formData.append('file', file)

            const { data } = await axios.post('/api/profile', formData, config)
            dispatch(changeUser({ name: values.name, avatarUrl: data.avatarUrl }))
            dispatch({ type: SAVE_STATE })
            history.push('/')
            toast(data.message)
        } catch(e) {
            toast.error(e.message)
        }
    }

    return (
        <div className={cn(authStyles.wrap, styles.wrap)} data-testid="profile">
            <Formik
                initialValues={{ name: name, file: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty, handleSubmit }) => {
                    return (
                        <Form className={authStyles.form}>
                            <InputForm
                                name={'name'}
                                type={'name'}
                                placeholder={'Enter your new name'}
                            />
                            <InputForm
                                name={'file'}
                                type={'file'}
                                onFileChange={setFile}
                            />

                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid || !dirty}
                                type={'submit'}
                            >
                                Change Info
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
