const config = require('config')

module.exports = function(email, token) {
   return {
      to: email,
      from: config.get('EMAIL_FROM'),
      subject: 'Reset password',
      html: `
         <h1>Your foggot password?</h1>
         <p>Please, click on a link</p>
         <hr />
         <a href="${config.get('BASE_URL')}password/${token}">Reset password</a>
      `
   }
}