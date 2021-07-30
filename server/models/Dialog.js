const { Schema, model } = require('mongoose')

const DialogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
})

module.exports = model('Dialog', DialogSchema)
