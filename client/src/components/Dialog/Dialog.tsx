import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUser, getDialog } from 'redux/selectors'
import { changeDialogId, changeMessages, changeUserTo } from 'redux/reducers/dialogSlice'
import { Top } from './Top'
import { Messages } from './Messages'
import { Textarea } from './Textarea'
import { SAVE_STATE } from 'redux/actions'

import styles from './Dialog.module.scss'
import 'emoji-mart/css/emoji-mart.css'
import './Dialog.scss'


export const Dialog = () => {
    const dispatch = useDispatch()
    const { userToId } = useParams<any>()

    const user = useSelector(getUser)
    const { dialogId, messages, userTo } = useSelector(getDialog)

    const headers = useMemo(() => ({ auth: `Che ${user.token}` }), [user.token])
    const getConfig = (params: any) => ({ params, headers })

    useEffect(() => {
        const getInfo = async () => {
            dispatch(changeMessages(null))

            try {
                const userToResponse = await axios.get(`/api/user/`, getConfig({ userToId }))
                dispatch(changeUserTo(userToResponse.data))

                const dialogResponse: any = await axios.get(`/api/dialog/`, getConfig({ userToId }))
                const currentDialogId = dialogResponse.data._id
                dispatch(changeDialogId(currentDialogId))

                if (dialogResponse.data.lastMessage) {
                    const messagesResponse: any = await axios.get(`/api/messages/`, getConfig({ dialogId: currentDialogId, userToId }))
                    dispatch(changeMessages(messagesResponse.data))
                }

                dispatch({ type: SAVE_STATE })
            } catch (e) {
                toast.error(e.message)
            }
        }

        getInfo()
    }, [userToId])

    if (!userTo || !dialogId) {
        return null
    }

    return (
        <div className={styles.wrap} data-testid="dialog">
            <Top userTo={userTo} />
            {messages && (
                <Messages />
            )}
            <Textarea dialogId={dialogId} />
        </div>
    )
}
