const config = require('config')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Dialog = require('../models/Dialog')
const regEmail = require('../emails/registraion')
const resetEmail = require('../emails/reset')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const { saveFile } = require('../utils/utils')

const transporter = nodemailer.createTransport(sendgrid({
   auth: {api_key: config.get('SENDGRID_API_KEY')}
}))

class UserController {
   constructor(io) {
      this.io = io
   }

   register = async (req, res) => {
      try {
         const errors = validationResult(req)

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Incorrect registration data'
            })
         }
   
         const {name, email, password} = req.body
   
         const candidate = await User.findOne({ email: email })
   
         if (candidate) {
            return res.status(400).json({ message: 'This user already exists' })
         }
   
         if (!name) {
            return res.status(400).json({ message: 'The name cannot be empty' })
         }
   
         const hashedPassword = await bcrypt.hash(password, 12)

         let avatarUrl = null
         if (req.files) avatarUrl = saveFile(req.files.file, 'images') 

         const user = new User({ name, email, password: hashedPassword, avatarUrl })

          // Created dialogs with other users
         let users = await User.find()
         if (users.length) {
            users.forEach(async userTo => {
               const dialog = new Dialog({ author: user._id, partner: userTo._id })
               await dialog.save() 
            })
         }

         await user.save() 
         await transporter.sendMail(regEmail(email)) 
   
         res.status(201).json({ message: 'User has been created' })

      } catch (error) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      }
   }

   login = async (req, res) => {
      try {
         const errors = validationResult(req)
   
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Incorrect login data'
            })
         }
   
         const {email, password} = req.body
   
         const user = await User.findOne({ email: email })
   
         if (!user) {
            return res.status(400).json({ message: 'User is not found' })
         }
   
         const isMatch = await bcrypt.compare(password, user.password)
   
         if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password, please try again' })
         }
   
         // Генерація токену на основі userId 
         const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '24h' }
         ) 

         this.io.emit('USER:UPDATE_STATUS', { userId: user.id, isOnline: true })
         const userResponser = { id: user.id, name: user.name, avatarUrl: user.avatarUrl, token }
         res.json(userResponser) 
   
      } catch (e) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      } 
   }

   logout = async (req, res) => {
      try {
         if (req.user) {
            this.io.emit('USER:UPDATE_STATUS', { userId: req.user.userId, isOnline: false })
            res.json({ message: 'Status change request has been sent' })
         } else {
            res.status(401).json({ message: 'Not registered' })
         }
      } catch (e) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      }
   }

   reset = (req, res) => {
      try {
         crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
               res.status(500).json({ message: 'Something went wrong, please try again' })
            }
   
            const token = buffer.toString('hex')
            const candidate = await User.findOne({email: req.body.email})
   
            if (candidate) {
               candidate.resetToken = token
               candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
               await candidate.save()
               await transporter.sendMail(resetEmail(candidate.email, token))
               res.status(201).json({ message: 'Check your email' })
            } else {
               res.status(400).json({ message: 'User with this email does not exist' })
            }
         })
      } catch(e) {
         console.log(e)
      }
   }

   resetFinished = async (req, res) => {
      try {
         const user = await User.findOne({
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
         })
   
         if (user) {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = undefined
            user.resetTokenExp = undefined
            await user.save()
            res.status(201).json({ message: 'Password changed' })
         } else {
            res.status(400).json({ message: 'User is not found' })
         }
      } catch (e) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      }
   }

   getUser = async (req, res) => {
      try {
         if (req.user) {
            const { userToId } = req.query
            const userId = userToId ? userToId : req.user.userId
            const user = await User.findOne({ _id: userId })

            this.io.emit('USER:UPDATE_STATUS', { userId, isOnline: true })
            res.json(user)
         } else {
            res.status(401).json({ message: 'Not registered' })
         }
      } catch (e) {
         res.status(500).json({ message: 'Something went wrong, please try again' })
      }
   }
}

module.exports = UserController
