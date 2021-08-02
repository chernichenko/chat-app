const socket = require('socket.io')

const createSocket = server => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })

    return io
}

module.exports = createSocket