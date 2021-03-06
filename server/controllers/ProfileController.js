const User = require('../models/User')
const { saveFile } = require('../utils/utils')

class ProfileController {
   constructor(io) {
      this.io = io
   }

   changeUserInfo = async (req, res) => {
      try {
         if (req.user) {
            const user = await User.findOne({ _id: req.user.userId })
   
            if (user) {
               if (req.files) {
                  const path = saveFile(req.files.file, 'images')
                  user.avatarUrl = path
               }
               user.name = req.body.name
               await user.save()
            }
            
            res.json({ message: 'Data changed', avatarUrl: user.avatarUrl })
         } else {
            res.status(401).json({ message: 'Not registered'})
         }
      } catch (e) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      }
   }
}

module.exports = ProfileController
