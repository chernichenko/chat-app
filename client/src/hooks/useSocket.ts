import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDialogs, getDialog, getUser } from 'redux/selectors'
import { changeDialogs } from 'redux/reducers/dialogsSlice'
import { changeMessages, changeUserTo } from 'redux/reducers/dialogSlice'
import { SAVE_STATE } from 'redux/actions'
import axios from 'axios'
import io from "socket.io-client"

export const useSocket = () => {
    const dispatch = useDispatch()
    const user: any = useSelector(getUser)
    const { dialogs }: any = useSelector(getDialogs)
    const { dialogId, messages, userTo }: any = useSelector(getDialog)

    const config = useMemo(() => ({ headers: { auth: `Che ${user.token}` } }), [user.token])

    useEffect(() => {
        const socket = io('http://localhost:5000')

        socket.on('USER:UPDATE_STATUS', data => setUserStatusRefreshDataState(data))
        socket.on('MESSAGE:NEW', data => setMessageNewRefreshDataState(data))
        socket.on('MESSAGE:UPDATE_IS_READ', data => setIsReadRefreshDataState(data))
    }, [])

    const [userStatusRefreshDataState, setUserStatusRefreshDataState] = useState<any>()
    const [messageNewRefreshDataState, setMessageNewRefreshDataState] = useState<any>()
    const [isReadRefreshDataState, setIsReadRefreshDataState] = useState<any>()

    useEffect(() => {
        if (userStatusRefreshDataState) {
            if (userStatusRefreshDataState.userId === userTo._id) {
                const userToUpdated = { ...userTo, isOnline: userStatusRefreshDataState.isOnline }
                dispatch(changeUserTo(userToUpdated))
            }

            const newDialogs = dialogs.map((dialog: any) => {
                if (userStatusRefreshDataState.userId === dialog.userTo._id) {
                    return {
                        ...dialog,
                        userTo: {
                            ...dialog.userTo,
                            isOnline: userStatusRefreshDataState.isOnline
                        }
                    }
                }
                return dialog
            })
            dispatch(changeDialogs(newDialogs))

            dispatch({ type: SAVE_STATE })
        }
    }, [userStatusRefreshDataState])

    useEffect(() => {
        const addMessage = async () => {
            const socketDialogId = messageNewRefreshDataState.dialogId
            const socketMessage = messageNewRefreshDataState.message
            const socketMessagesCount = messageNewRefreshDataState.newMessagesCount

            if (socketDialogId === dialogId) {
                if (user.id !== socketMessage.user) {
                    await axios.post(`/api/message/update`,
                        { dialogId: socketDialogId, messageId: socketMessage._id, messageUserId: user.id }, config)
                }
                dispatch(changeMessages(messages ? [...messages, socketMessage] : [socketMessage]))
                dispatch({ type: SAVE_STATE })
            }

            const newDialogs = dialogs.map((dialog: any) => {
                if (socketDialogId === dialog._id) {
                    const newMessagesCount = user.id === socketMessage.user ? 0 : socketMessagesCount
                    return { ...dialog, lastMessage: socketMessage, newMessagesCount }
                }
                return dialog
            })
            dispatch(changeDialogs(newDialogs))

            dispatch({ type: SAVE_STATE })
        }

        messageNewRefreshDataState && addMessage()
    }, [messageNewRefreshDataState])

    useEffect(() => {
        const updateIsRead = () => {
            const socketDialogId = isReadRefreshDataState.dialogId
            const socketMessagesIds = isReadRefreshDataState.messagesIds

            if (socketDialogId === dialogId) {
                const newMessages = messages.map((message: any) => {
                    if (socketMessagesIds.find((messageId: any) => messageId === message._id)) return { ...message, isRead: true }
                    return message
                })
                dispatch(changeMessages(newMessages))
            }

            dispatch({ type: SAVE_STATE })
        }

        isReadRefreshDataState && messages && updateIsRead()
    }, [isReadRefreshDataState])
}
