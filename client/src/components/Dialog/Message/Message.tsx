import { FC } from 'react'
import cn from 'classnames'
import checkSvg from 'assets/icons/check.svg'
import noCheckSvg from 'assets/icons/no-check.svg'

import styles from '../Dialog.module.scss'

interface IMessage {
   readonly text: string
   readonly avatarUrl: string
   readonly userName: string
   readonly isMe: boolean
   readonly isRead: boolean
   readonly time: string | undefined
   readonly colorObj: any
}

export const Message: FC<IMessage> = ({
   text,
   avatarUrl,
   userName = 'No name',
   isMe,
   isRead,
   time,
   colorObj = {}
}) => {
   return (
      <div className={cn(styles.message, isMe && styles.me )} data-testid="message">
         <div className={styles.avatar}>
            {avatarUrl 
               ? (
                  <img src={avatarUrl} alt="" data-testid="avatar" />
               ) : (
                  <div 
                     className={styles.noAvatar}
                     style={{
                        background: `linear-gradient(135deg, ${colorObj.color} 0%, ${colorObj.colorLighten} 96.52%)`
                     }}
                  >
                     {userName[0].toUpperCase()}
                  </div>
               )}
         </div>
         <div className={styles.content}>
            <div className={styles.text}>{text}</div>
            <div className={styles.time}>{time}</div>
            {isMe && (
               <div className={styles.isCheck}>
                  <img src={isRead ? checkSvg : noCheckSvg} alt="" />
               </div>
            )}
         </div>
      </div>
   )
}
