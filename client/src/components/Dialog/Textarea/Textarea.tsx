import { useState, useMemo, FC } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUser } from 'redux/selectors'
// @ts-ignore
import { Picker } from 'emoji-mart'

import styles from '../Dialog.module.scss'
import smileSvg from 'assets/icons/smile.svg'
import sendSvg from 'assets/icons/send.svg'

interface ITextArea {
   readonly dialogId: string
}

export const Textarea: FC<ITextArea> = ({ dialogId }) => {
   const { token } = useSelector(getUser)
   const config: any = useMemo(() => ({ headers: { auth: `Che ${token}` } }), [token])
   
   const [value, setValue] = useState('')
   const [isEmojiOpen, setIsEmojiOpen] = useState(false)

   const addEmoji = (e: any) => {
      let sym = e.unified.split('-')
      let codesArray: any = []
      sym.forEach((el: any) => codesArray.push('0x' + el))
      let emoji = String.fromCodePoint(...codesArray)
      setValue(value + emoji)
      setIsEmojiOpen(false)
   }

   const keyHandler = (e: any) => {
      if (e.keyCode === 13) sendHandler()
   }

   const sendHandler = async () => {
      try {
         if (value) {
            await axios.post(`/api/message/`, { text: value, dialog: dialogId }, config)
            setValue('')
            setIsEmojiOpen(false)
         }
      } catch (e) {
         toast.error(e.message)
      }
   }

   return (
      <div className={styles.textarea} data-testid="textarea">
         {isEmojiOpen
            ? (
               <div className={styles.emoji}>
                  <Picker
                     onSelect={addEmoji}
                     set="apple"
                  />
               </div>
            ) : (
               <div
                  className={styles.emojiButton}
                  onClick={() => setIsEmojiOpen(true)}
               >
                  <img src={smileSvg} alt="" />
               </div>
            )
         }
         <div className={styles.inputWrap}>
            <input
               placeholder="Enter message text"
               value={value}
               onChange={e => setValue(e.target.value)}
               onKeyDown={keyHandler}
            />
            <div className={styles.send} onClick={sendHandler} data-testid="send-message">
               <img src={sendSvg} alt="" />
            </div>
         </div>
      </div>
   )
}
