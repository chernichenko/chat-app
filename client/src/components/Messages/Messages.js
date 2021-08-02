import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Message, Loader } from 'components'
import { getFormatedTime } from 'utils/date'
import generateGradient from 'utils/color'

const Messages = ({ isLoader, messages, userMy, userTo }) => {

    return (
        <div id="messages" className="Dialog__messages">
            {isLoader 
            ? <Loader />
            : (messages && messages.length)
            ? messages.map((message, index) => {
                const isMe = userMy.id.toString() === message.user.toString()
                const avatarUrl = isMe ? userMy.avatarUrl : userTo.avatarUrl
                const userName = isMe ? userMy.name : userTo.name
                const colorObj = generateGradient(isMe ? userMy.id : userTo._id)

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
            : <span className="Dialog__no-messages">Сообищений пока нет.</span>}
        </div>
    )
}

export default Messages