const config = require('config')

module.exports = function(email) {
   return {
      to: email,
      from: 'alexchernichenko18@outlook.com',
      subject: 'Account was created',
      html: `
         <h1>Hello!</h1>
         <p>Your account was created. Email - ${email}</p>
         <hr /> 
         <a href="${config.get('BASE_URL')}">Chat</a>
      `
   }
}
