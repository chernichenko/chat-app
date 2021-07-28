const socket = require('socket.io')

const createSocket = server => {
    const io = socket(server)

    return io
}

module.exports = createSocket