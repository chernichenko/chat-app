const {check} = require('express-validator')

exports.checkRegisterInputs = [ 
   check('email', 'Incorrect emaill').isEmail(),
   check('password', 'Minimum password length 6 characters')
      .isLength({ min: 6 }) 
]

exports.checkLoginInputs = [ 
   check('email', 'Incorrect emaill').normalizeEmail().isEmail(),
   check('password', 'Enter password').exists()
]

exports.checkArticleInputs = [ 
   check('title', 'Minimum password length 3 characters').isLength({ min: 3 }),
   check('desc', 'Minimum password length 3 characters').isLength({ min: 3 }) 
]
 