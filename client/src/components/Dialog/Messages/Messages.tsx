import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getUser, getDialog } from 'redux/selectors'
import { getFormatedTime } from 'utils/date'
import generateGradient from 'utils/color'
import { Message } from '../Message'

import styles from '../Dialog.module.scss'

export const Messages = () => {
    const messagesRef = useRef<any>()
    const user = useSelector(getUser)
    const { messages, userTo }: any = useSelector(getDialog)

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div ref={messagesRef} className={styles.messages}>
            {messages?.length
                ? (
                    messages.map((message: any, index: number) => {
                        const isMe = user.id.toString() === message.user.toString()
                        const avatarUrl = isMe ? user.avatarUrl : userTo.avatarUrl
                        const userName = isMe ? user.name : userTo.name
                        const colorObj = generateGradient(isMe ? user.id : userTo._id)

                        return (
                            <Message
                                key={index}
                                text={message.text}
                                avatarUrl={avatarUrl}
                                userName={userName}
                                isMe={isMe}
                                isRead={message.isRead}
                                time={getFormatedTime(new Date(message.createdAt))}
                                colorObj={colorObj}
                            />
                        )
                    })
                ) : (
                    <span className={styles.noMessages}>There are no messages.</span>
                )
            }
        </div>
    )
}
