import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUser } from 'redux/selectors'
import { Top } from './Top'
import { Messages } from './Messages'
import { Textarea } from './Textarea'

import styles from './Dialog.module.scss'
import 'emoji-mart/css/emoji-mart.css'
import './Dialog.scss'

export const Dialog = () => {
    const { userToId } = useParams<any>()
    const user = useSelector(getUser)
    const headers = useMemo(() => ({ auth: `Che ${user.token}` }), [user.token])
    const getConfig = (params: any) => ({ params, headers })

    const [userTo, setUserTo] = useState<any>()
    const [dialog, setDialog] = useState<any>()
    const [messages, setMessages] = useState<any>()

    useEffect(() => {
        const getInfo = async () => {
            setMessages(null)

            try {
                const userToResponse = await axios.get(`/api/user/`, getConfig({ userToId }))
                setUserTo(userToResponse.data)
                const dialogResponse: any = await axios.get(`/api/dialog/`, getConfig({ userToId }))
                setDialog(dialogResponse.data)

                if (dialogResponse.data.lastMessage) {
                    const messagesResponse: any = await axios.get(`/api/messages/`, getConfig({ dialogId: dialogResponse.data._id, userToId }))
                    setMessages(messagesResponse.data)
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
            {messages && (
                <Messages
                    messages={messages}
                    userFrom={user}
                    userTo={userTo}
                />
            )}
            <Textarea dialogId={dialog._id} />
        </div>
    )
}
