var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://LuanLCosta:luanlprc@mongodb/sampledb');


// const chat = mongoose.model('Chat', { usuario: String, message: String });


app.get('/', function (req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Teste chat \n");
});

io.on("connection", function (socket){
    socket.on("CHAT", function(data){
    	const mensage = new chat({ usuario : data.usuario, message: data.message});
    	message.save().then (()=> console.log('gravou ' + data.message)) 
  		io.to(`${socketId}`).emit('CHAT', { usuario : data.usuario, message: data.message});
        // io.emit("CHAT", { usuario : data.usuario, message: data.message});
    });
});

var port = process.env.PORT || 8080;

http.listen(port, function(){
    console.log("chat com sucesso!!!!!!!!!");
})