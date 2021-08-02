const Message = require('../models/Message')
const Dialog = require('../models/Dialog')

class MessageController {
    constructor(io) {
        this.io = io
    }

    getMessages = async (req, res) => {
        try {
            if (req.user) {
                const { dialogId, userToId } = req.query

                await Message.update(
                    { "dialog": dialogId, "user": userToId, "isRead": false },
                    { "$set": { "isRead": true } },
                    { "multi": true },
                    (err, writeResult) => { }
                )

                let messages = await Message
                    .find({ dialog: dialogId })

                messages.sort((a, b) => {
                    if (a.createdAt.getTime() > b.createdAt.getTime()) return false
                    return true
                })

                res.json(messages)
            } else {
                res.status(401).json({ message: 'Not registered' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' })
        }
    }

    sendMessage = async (req, res) => {
        try {
            if (req.user) {
                const { text, dialog } = req.body

                console.log(1)

                const message = new Message({ text, dialog, user: req.user.userId, isRead: false })

                console.log(2)
                const dialogFromDB = await Dialog.findOne({ _id: dialog })
                dialogFromDB.lastMessage = message._id

                console.log(3)
                await dialogFromDB.save()
                console.log(4)
                await message.save()
                console.log(5)
                
                const messagesNotRead = await Message.find({ dialog, isRead: false })
                console.log(6)
                const newMessagesCount = messagesNotRead.length
                console.log(7)

                this.io.emit('MESSAGE:NEW', { dialogId: dialog, message: message, newMessagesCount })
                console.log(8)
                res.json(message)
            } else {
                res.status(401).json({ message: 'Not registered' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' })
        }
    }

    setIsReadStatus = async (req, res) => {
        try {
            if (req.user) {
                const { dialogId, messageId, messageUserId } = req.query
                await Message.update(
                    { "_id": messageId },
                    { "$set": { "isRead": true } }
                )
                this.io.emit('MESSAGE:UPDATE_IS_READ', { dialogId, messagesIds: [messageId], messageUserId })
                res.json({ message: 'Статус изменен' })
            } else {
                res.status(401).json({ message: 'Not registered' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' })
        }
    }
}

module.exports = MessageController
