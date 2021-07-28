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
               message: 'Некорректные данные при регистрации'
            })
         }
   
         const {name, email, password} = req.body
   
         const candidate = await User.findOne({ email: email })
   
         if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
         }
   
         if (!name) {
            return res.status(400).json({ message: 'Имя не может быть пустым' })
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
   
         res.status(201).json({ message: 'Пользователь создан' })

      } catch (error) {
         res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
      }
   }

   login = async (req, res) => {
      try {
         const errors = validationResult(req)
   
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Некорректные данные при входе в систему'
            })
         }
   
         const {email, password} = req.body
   
         const user = await User.findOne({ email: email })
   
         if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
         }
   
         const isMatch = await bcrypt.compare(password, user.password)
   
         if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
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
         res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
      } 
   }

   logout = async (req, res) => {
      try {
         if (req.user) {
            this.io.emit('USER:UPDATE_STATUS', { userId: req.user.userId, isOnline: false })
            res.json({ message: 'Запрос на изменение статуса отправлен' })
         } else {
            res.status(401).json({ message: 'Не зарегистрирован' })
         }
      } catch (e) {
         res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
      }
   }

   reset = (req, res) => {
      try {
         crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
               res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
            }
   
            const token = buffer.toString('hex')
            const candidate = await User.findOne({email: req.body.email})
   
            if (candidate) {
               candidate.resetToken = token
               candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
               await candidate.save()
               await transporter.sendMail(resetEmail(candidate.email, token))
               res.status(201).json({ message: 'Проверьте Ваш почтовый ящик' })
            } else {
               res.status(400).json({ message: 'Пользователя с таким email не существует' })
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
            res.status(201).json({ message: 'Пароль изменен' })
         } else {
            res.status(400).json({ message: 'Пользователь не найден' })
         }
      } catch (e) {
         console.log(e)
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
            res.status(401).json({ message: 'Не зарегистрирован' })
         }
      } catch (e) {
         res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
      }
   }
}

module.exports = UserController