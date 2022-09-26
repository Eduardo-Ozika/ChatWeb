const express = require("express")
const { Socket } = require("socket.io")
const app = express()

app.use(express.static("public"))

const http = require("http").Server(app)
const PORT = process.env.PORT || 8000

//função de call back
http.listen(PORT, () => console.log(`servidor iniciado na porta ${PORT}`))
app.get("/",(_,resp) => resp.sendFile(`${__dirname}/index.html`) )

const serverSocket = require("socket.io")(http)
serverSocket.on("connect", Socket => {
    console.log(`cliente ${Socket.id} conectou`)

    Socket.on("chat msg", msg => serverSocket.emit("chat msg",`Msg recebida de ${Socket.username}: ${msg}`))
    Socket.on("login", username =>{
        Socket.username = username
        serverSocket.emit("chat msg", `Usuario ${username} entrou`)
    })
})