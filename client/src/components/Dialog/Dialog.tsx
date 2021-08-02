import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUser } from 'redux/selectors'
import { Top } from './Top'
import { Textarea } from './Textarea'

import styles from './Dialog.module.scss'
import 'emoji-mart/css/emoji-mart.css'
import './Dialog.scss'

export const Dialog = () => {
    const { userToId } = useParams<any>()
    const user = useSelector(getUser)

    const headers = useMemo(() => ({ auth: `Che ${user.token}` }), [user.token])

    const getConfig = (params: any) => ({
        params,
        headers
    })

    const [userTo, setUserTo] = useState<any>()
    const [dialog, setDialog] = useState<any>()

    useEffect(() => {
        const getInfo = async () => {
            try {
                let messagesResponse: any = []

                const userToResponse = await axios.get(`/api/user/`, getConfig({ userToId }))
                setUserTo(userToResponse.data)
                const dialogResponse: any = await axios.get(`/api/dialog/`, getConfig({ userToId }))
                setDialog(dialogResponse.data)

                if (dialogResponse.data.lastMessage) {
                    messagesResponse = await axios.get(`/api/messages/`, getConfig({ dialogId: dialogResponse._id, userToId: userToId }))
                }

            } catch (e) {
                toast.error(e.message)
            }
        }

        getInfo()
    }, [userToId])

    if (!userTo || !dialog) {
        return null
    }

    return (
        <div className={styles.wrap}>
            <Top userTo={userTo} />
            <Textarea dialogId={dialog._id} />
        </div>
    )
}
