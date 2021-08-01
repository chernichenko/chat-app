import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Search, DialogItem } from 'components'
import { changeDialogs } from 'redux/reducers/dialogsSlice'
import { getFormatedTime } from 'utils/date'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
    const dispact = useDispatch()
    const user = useSelector((s: any) => s.user)
    const dialogs = useSelector((s: any) => s.dialogs.dialogs)
    const config = useMemo(() => ({ headers: { auth: `Che ${user.token}` } }), [user.token])

    const [dialogsState, setDialogsState] = useState([])

    useEffect(() => {
        const getDialogs = async () => {
            try {
                const response = await axios.get(`/api/dialogs/sidebar`, config)
                const dialogsResponse = response.data
                dispact(changeDialogs(dialogsResponse))
            } catch (e) { toast(e.message) }
        }
        
        getDialogs()
    }, [])

    useEffect(() => {
        setDialogsState(dialogs)
    }, [dialogs])

    // Socket Refresh Status 
//   const [newStatusState, setNewStatusState] = useState<any>()

//   useEffect(() => {
//     if (!isFirstLoad) {
//       const newDialogs = dialogs.map(dialog => {
//         if (dialog.userTo._id.toString() === newStatusState.userId.toString()) {
//           return {
//             ...dialog,
//             userTo: {
//               ...dialog.userTo,
//               isOnline: newStatusState.isOnline
//             }
//           }
//         }
//         return dialog
//       })
//       setDialogs(newDialogs)
//     }
//   }, [newStatusState])

//   // Socket Last Message
//   const [newLastMessageState, setNewLastMessageState] = useState<any>()

//   useEffect(() => {
//     if (!isFirstLoad) {
//       const newDialogs = dialogs.map(dialog => {
//         if (dialog._id.toString() === newLastMessageState.dialogId.toString()) {
//           let newMessagesCount 
//           user.id.toString() === newLastMessageState.message.user.toString() 
//             ? newMessagesCount = 0
//             : newMessagesCount = newLastMessageState.newMessagesCount 
//           return { ...dialog, lastMessage: newLastMessageState.message, newMessagesCount }
//         }
//         return dialog
//       })
//       setDialogs(newDialogs)
//     }
//   }, [newLastMessageState])

//   // Socket Status isRead 
//   const [newMessageIsReadState, setNewMessageIsReadState] = useState<any[{}]>()

//   useEffect(() => {
//     const updateIsReadState = () => {
//       const newDialogs = dialogs.map(dialog => {
//         if (dialog._id.toString() === newMessageIsReadState.dialogId.toString()) {
//           if (newMessageIsReadState.messagesIds.some(messageId => messageId === dialog.lastMessage._id.toString())) {
//             return {
//               ...dialog,
//               newMessagesCount: 0,
//               lastMessage: {
//                 ...dialog.lastMessage,
//                 isRead: true
//               }
//             }
//           }
//         }
//         return dialog
//       })
//       setTimeout(() => { setDialogs(newDialogs) }, 1000)
//     }

//     if (!isFirstLoad && Boolean(newMessageIsReadState.messagesIds.length)) updateIsReadState()
//   }, [newMessageIsReadState])

    return (
        <div className={styles.wrap}>
            <Search initialDialogs={dialogs} setDialogs={setDialogsState} />
            <div className={styles.dialogs}>
                {dialogsState.length
                    ? (
                        dialogsState.map((item: any, key: number) => {
                            return (
                                <DialogItem
                                    key={item._id + key}
                                    userToId={item.userTo._id}
                                    avatar={item.userTo.avatarUrl}
                                    isOnline={item.userTo.isOnline}
                                    name={item.userTo.name}
                                    lastMessage={item.lastMessage?.text}
                                    time={item.lastMessage ? getFormatedTime(new Date(item.lastMessage.createdAt)) : ''}
                                    isMe={''}
                                    isRead={!!item.lastMessage?.isRead}
                                    newMessagesCount={item.newMessagesCount ? item.newMessagesCount : 0}
                                />
                            )
                        })
                    ) 
                    : null
                }
            </div>
        </div>
    )
}
