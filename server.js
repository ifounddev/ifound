    var app = require("express")();
    var http = require("http").Server(app);
    var io = require("socket.io")(http);
    var users = {};


    app.get('/', function (req, res){
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("Teste chat \n");
    });

    io.on("connection", function (socket){


      socket.on("LOGIN", function(data){

        if(data.userToken in users){
          console.log("entrou no if " +  users.userToken);

        }else{
          console.log("entrou no else " +  users.userToken);

          socket.nickname = data.userToken;
          console.log("socket nick " +  socket.nickname);

          users[socket.nickname] = socket;
          console.log("users " +  users);

        }
      });


      socket.on("CHAT", function(data){

        console.log("Alguem chatou" + data.usuario);
if(data.usuario in users){
          users[data.usuario].emit("MSG", { usuario : data.usuario, message: data.message});

        }else{
                  console.log("Nao encontrou " + data.usuario + " no array " + data.userToken);

        }
        // io.emit("CHAT", { usuario : data.usuario, message: data.message});
        // users[data.usuario].emit( "CHAT", { usuario : data.usuario, message: data.message});


      });
    });

    var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    var ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
    // var port = process.env.PORT || 8080;


    http.listen(port, ip, function(){
      console.log("chat com sucesso!!!!!!!!!");
    })
