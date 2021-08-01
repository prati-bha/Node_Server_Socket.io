const { SOCKET_CONNECTION_FIELDS } = require('./constants');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const notificationObject = {
    "title": "New notification",
    "body": "You have new notification",
    "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZrv3_PEnkdOIZvnr0COONt3kL7rSSq623dB3fyLCgT7GARpReF26nPOre6JCLHKu7KQ&usqp=CAU"
}

const emitMessages = () => {
    io.emit(SOCKET_CONNECTION_FIELDS.NEW_NOTIFICATION, notificationObject)
}

const setIntervalForNotifications = () => {
    return setInterval(emitMessages, 10000);
}

io.on('connection', socket => {
    console.log("connection made successfully");
    const intervalID = setIntervalForNotifications();
    // clearInterval(intervalID)
})
console.log("server started")
server.listen(7000);