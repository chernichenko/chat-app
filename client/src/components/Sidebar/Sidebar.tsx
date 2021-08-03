import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Search, DialogItem } from 'components'
import { changeDialogs } from 'redux/reducers/dialogsSlice'
import { getFormatedTime } from 'utils/date'
import { getUser, getDialogs } from 'redux/selectors'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
    const dispact = useDispatch()
    const { token } = useSelector(getUser)
    const { dialogs } = useSelector(getDialogs)
    const config = useMemo(() => ({ headers: { auth: `Che ${token}` } }), [token])

    const [dialogsState, setDialogsState] = useState([])

    useEffect(() => {
        const getDialogs = async () => {
            try {
                const response = await axios.get(`/api/dialogs/sidebar`, config)
                const dialogsResponse = response.data
                dispact(changeDialogs(dialogsResponse))
            } catch (e) { toast.error(e.message) }
        }
        
        getDialogs()
    }, [])

    useEffect(() => {
        setDialogsState(dialogs)
    }, [dialogs])

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
