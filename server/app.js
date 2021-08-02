const express = require('express')
const createRoutes = require('./core/routes')
const path = require('path')
const createSocket = require('./core/socket')
const PORT = 5000
require('./core/db')
global.rootPath = path.resolve(__dirname)

const app = express()
const server = app.listen(PORT, () => { console.log(`Server started!`) })
const io = createSocket(server)

createRoutes(app, io)
