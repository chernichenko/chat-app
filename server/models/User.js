const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   avatarUrl: String,
   resetToken: String,
   resetTokenExp: Date,
   lastSeen: { type: Date, default: new Date() },
})

UserSchema.virtual("isOnline").get(function () {
   const now = new Date()
   const diffMs =  now.getTime() - this.lastSeen.getTime()
   const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
   return diffMins < 5
})

UserSchema.set("toJSON", {
   virtuals: true,
})

module.exports = model('User', UserSchema)
