import { useMemo, FC } from 'react'
import { NavLink } from "react-router-dom"
import generateGradient from 'utils/color'

import styles from './DialogItem.module.scss'

interface IDialogItem {
  readonly userToId: string
  readonly avatar: string
  readonly isOnline: boolean
  readonly name: string
  readonly lastMessage: string
  readonly time: string | undefined
  readonly isMe: boolean | string
  readonly isRead: boolean
  readonly newMessagesCount: number
}

export const DialogItem: FC<IDialogItem> = ({
  userToId,
  avatar,
  isOnline,
  name,
  lastMessage,
  time,
  isMe,
  isRead,
  newMessagesCount
}) => {
  const { color, colorLighten } = useMemo(() => generateGradient(userToId), [userToId])

  return (
    <NavLink className={styles.itemWrap} to={`/dialog/${userToId}`}>
      <div className={styles.item}>
        <div className={styles.column1}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {avatar 
              ? (
                <img src={avatar} alt=""/>
              ) : (
                <div 
                  className={styles.noAvatar}
                  style={{ background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`}}
                >
                  {name[0].toUpperCase()}
                </div>    
              )}
            </div>
            {isOnline && <div className={styles.online}><span></span></div>}
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.name}>{name}</div>
          <div className={styles.message}><span>{lastMessage}</span></div>
        </div>
        {lastMessage && <div className={styles.column3}>
          <div className={styles.time}>{time}</div>
          {isMe ? (
            <div className={styles.messageStatus}>
              <img src={isRead ? 'check' : 'noCheck'} alt="" />
            </div>
          ) : (
            !!newMessagesCount ? (
              <div className={styles.messageCount}>{newMessagesCount}</div>
            ) : (
              <></>
            )
          )}
        </div>}
      </div>
    </NavLink>
  )
}
