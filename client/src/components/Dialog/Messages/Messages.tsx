import { FC } from 'react'
import { getFormatedTime } from 'utils/date'
import generateGradient from 'utils/color'
import { Message } from '../Message'

import styles from '../Dialog.module.scss'

interface IMessages {
    readonly messages: any[]
    readonly userFrom: any
    readonly userTo: any
}

export const Messages: FC<IMessages> = ({ messages, userFrom, userTo }) => {
    return (
        <div id="messages" className={styles.messages}>
            {messages?.length
                ? (
                    messages.map((message, index) => {
                        const isMe = userFrom.id.toString() === message.user.toString()
                        const avatarUrl = isMe ? userFrom.avatarUrl : userTo.avatarUrl
                        const userName = isMe ? userFrom.name : userTo.name
                        const colorObj = generateGradient(isMe ? userFrom.id : userTo._id)

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
                    <span className={styles.noMessages}>Сообищений пока нет.</span>
                )
            }
        </div>
    )
}
