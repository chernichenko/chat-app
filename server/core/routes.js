const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const {checkRegisterInputs, checkLoginInputs} = require('../utils/validators')
const auth = require('../middleware/auth.middleware')
const lastSeen = require('../middleware/lastSeen.middleware')
const UserCtrl = require('../controllers/UserController')
const ProfileCtrl = require('../controllers/ProfileController')
const DialogCtrl = require('../controllers/DialogController')
const MessageCtrl = require('../controllers/MessageController')

const createRoutes = (app, io) => {
   const UserController = new UserCtrl(io)
   const ProfileController = new ProfileCtrl(io)
   const DialogController = new DialogCtrl(io)
   const MessageController = new MessageCtrl(io)

   app.use(cors())
   app.use(fileUpload())
   app.use(express.static('images'))
   app.use('/images', express.static(path.join(rootPath, 'images')))
   app.use(express.json({ extended: true }))
   app.enable('trust proxy')

   // Routes 
   app.post('/api/auth/register', checkRegisterInputs, UserController.register)
   app.post('/api/auth/login', checkLoginInputs, UserController.login)
   app.post('/api/auth/logout', auth, UserController.logout)
   app.post('/api/auth/reset', UserController.reset)
   app.post('/api/auth/reset/finished', checkRegisterInputs, UserController.resetFinished)

   app.get('/api/user', auth, lastSeen, UserController.getUser)
   
   app.post('/api/profile', auth, lastSeen, ProfileController.changeUserInfo)

   app.get('/api/dialog', auth, lastSeen, DialogController.getDialog)
   app.get('/api/dialogs/sidebar', auth, DialogController.getDialogsToSidebar)
   
   app.get('/api/messages', auth, MessageController.getMessages)
   app.post('/api/message', auth, lastSeen, MessageController.sendMessage)
   app.put('/api/message/update', auth, MessageController.setIsReadStatus)
   
}

module.exports = createRoutes