const UserModel = require('../models/User')

const lastSeen = async (req, _, next) => {
   if (req.user) {
      const user = await UserModel.findOne({ _id: req.user.userId })
      user.lastSeen = new Date()
      user.save()
   }
   next()
}

module.exports = lastSeen
