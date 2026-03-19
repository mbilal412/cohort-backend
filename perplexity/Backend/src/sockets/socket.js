import { Server } from 'socket.io'

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    console.log('socket initialized')

    io.on('connection', (socket) => {
        console.log('user is connected: ', socket.id)
    })
}


