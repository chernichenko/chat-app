import React from 'react'
import classNames from 'classnames/bind'
import checkSvg from 'assets/icons/check.svg'
import noCheckSvg from 'assets/icons/no-check.svg'

const Message = ({ text, avatarUrl, userName, isMe, isRead, time, colorObj }) => {
   let cls = classNames({ 'Message': true, 'me': isMe })

   return (
      <div className={cls}>
         <div className="Message__avatar">
            {avatarUrl 
            ? <img src={avatarUrl} alt=""/>
            : <div 
               className="Message__no-avatar"
               style={{
                  background: `linear-gradient(135deg, ${colorObj.color} 0%, ${colorObj.colorLighten} 96.52%)`
               }}
            >{userName[0].toUpperCase()}</div>}
         </div>
         <div className="Message__content">
            <div className="Message__text">{text}</div>
            <div className="Message__time">{time}</div>
            {isMe && <div className="Message__is-check">
               <img src={isRead ? checkSvg : noCheckSvg} alt="" />
            </div>}
         </div>
      </div>
   )
}

export default Message