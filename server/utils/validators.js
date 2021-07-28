const {check} = require('express-validator')

exports.checkRegisterInputs = [ 
   check('email', 'Некорректный email').isEmail(),
   check('password', 'Минимальная длинна пароля 6 символов')
      .isLength({ min: 6 }) 
]

exports.checkLoginInputs = [ 
   check('email', 'Некорректный email').normalizeEmail().isEmail(),
   check('password', 'Введите пароль').exists()
]

exports.checkArticleInputs = [ 
   check('title', 'Минимальная длинна пароля 3 символа').isLength({ min: 3 }),
   check('desc', 'Минимальная длинна пароля 3 символа').isLength({ min: 3 }) 
]
 