// const { Socket } = require('engine.io')
const express = require('express')

const app = express()

const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {

    console.log(`listning at port ${PORT}`)
})


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


const io = require('socket.io')(http)

io.on('connection', (socket) => {
    // console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

    socket.on('new-user-joined', userName => {
        console.log(`${userName} joined the chat`);
        socket.broadcast.emit('user-joined', userName)
    })
})
