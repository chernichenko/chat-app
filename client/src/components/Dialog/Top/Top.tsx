import { FC } from 'react'
import { getFormatedTime } from 'utils/date'

import styles from '../Dialog.module.scss'

interface ITop {
   readonly userTo: any; 
}

export const Top: FC<ITop> = ({ userTo }) => {
   return (
      <div className={styles.top}>
         <div className={styles.inner}>
            <div className={styles.name}>{userTo.name}</div>
            <div className={styles.status}>
               {userTo.isOnline 
                  ? (
                     <div className={styles.onlineWrap}>
                        <div className={styles.circle}></div>
                        <span>online</span>
                     </div>
                  ) : (
                     <span className={styles.time}>{getFormatedTime(new Date(userTo.lastSeen))}</span>
                  )
               }
            </div>
         </div>
      </div>
   )
}
