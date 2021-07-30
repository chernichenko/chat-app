
const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(
   config.get('mongoURI'),
   { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true 
   }
)

mongoose.connection.once('open', () => { console.log('Connect to database!') })
