const mongoose = require('mongoose')
const Room = require('../models/Room')
const Code = require('../models/Code')
const Lobby = require('../models/Lobby')
const User = require('../models/User')
const url = require('url')
var http = require("http");

function socket(io) {
    
    let newCode;
    const users = {};

    io.on('connection', function (socket) {

        let theLocation = socket.handshake.headers.referer.split('/');
        let actualLocation = theLocation[4];
        
        socket.on('joinRoom', function(data) {
            console.log("ROOM TARGET");
         //   console.log(data);
            socket.join(data, function () {
                console.log("Socket now in rooms", socket.rooms);
                console.log("THE IO IS");
             //   console.log(io.sockets.adapter.rooms)
                socket.on('set-user', function(userData){
                    console.log("THE USER DATA WAS")
                    console.log(userData);

                    if(users.hasOwnProperty(data) === true){
                        users[data].push({userId: socket.id, userName: userData});
                    }else{
                        users[data] = [{userId: socket.id, userName: userData}];
                    }
                   
                    socket.emit('showUsersDb', users);
                    // users[socket.id] = userData;
                    // console.log("HELLO WOLRD 2")
                    // console.log(users);
                    // console.log(socket.handshake.headers.referer);
                    io.in(data).emit('listOfUsers',  users[data]);
                    // io.in(data).emit('listOfUsers', {theId: socket.id, theUser: userData});
            
                    //OLD WAY TO JOIN ROOM
                    // socket.join(realUrl, function (){
                    //     console.log("THE ROOM")
                    //     console.log(socket.id + " now in rooms ", socket.rooms);
            
                    // console.log("LIST ROOM");
                    // console.log(io);
                    // })
                  //  console.log(socket.adapter.rooms);
            
                    // socket.emit('sendRoom', {theRoom: socket.adapter.rooms})
                    // console.log("THE ACTUAL ROOM IS")
                    // console.log(io.sockets);
                    // socket.emit('actualRoom', {actualRoom: io.sockets});
                    // socket.emit('setSocketId', {theId: socket.id, name: data});
                   })
            });
        //       socket.join(data, function (){
        //     console.log("THE ROOM")
        //     console.log(socket.id + " now in rooms ", socket.rooms);
        // console.log("LIST ROOM");
        // console.log(io);
        //       })
        });
       // console.log(socket);
         //console.log(socket.client); //THIS PRINTS THE WHOLE SOCKET
         let theUrl = socket.handshake.headers.referer;
         // console.log(theUrl);
         var trueUrl = url.parse(theUrl, true);
         // console.log(trueUrl.pathname);
         let hUrl = trueUrl.pathname.split('/');
         //  console.log(hUrl[2]);
         let realUrl = hUrl[2];

    //    console.log("SERVER THIS");
       
       

        socket.on('chat message', function (msg) {
       
           
        
            socket.broadcast.to(`${realUrl}`).emit("received", { message: msg.msg, sender: msg.sender});
            let chat = new Room({
                message: msg.msg,
                sender: msg.sender
            })
            chat.save().
            then(theChat => {
                console.log("Successfully saved ", theChat);
            })
            .catch((err) => console.log("An error happened while saving message, ", err));

            Lobby.findByIdAndUpdate(`${realUrl}`, {
                $push: {
                    messages: chat,
                    code: newCode
                }
            }).then(data => console.log(data))
        })

        // END OF CHAT MESSAGES
        socket.on('send-code', (code) => {
            socket.broadcast.emit('code-message', code)
            newCode = new Code({
                code: code
            })
            newCode.save((err) => {
                if (err) return handleError(err)
            })
        })

        socket.on("kicked", (data) => {
            console.log(socket)
            if (data == undefined || !data){
                return;
            } else{
                // console.log("YOU WERE KICKED");
                // console.log(data);
                // console.log("THE USER WAS");
                // console.log(io.sockets.connected[socket.id]);
                io.sockets.connected[data].emit('exitChat', '/allChats');
            }
       
                })

                socket.on( 'disconnect', function() {
                    console.log("DISCONNECTED, " + users[actualLocation]);
                    if(users[actualLocation] === undefined || !users[actualLocation]){
                        socket.emit('exitChat', '/');
                    }else{
                        let indexToRemove = users[actualLocation].findIndex(i => i.userId === socket.id);
                        users[actualLocation].splice(indexToRemove, 1);
                        console.log(users);
                    }
             
                    });
            })
        }


//==========================WORKING VERSION=======================================
// function socket(io) {
//     let newCode;



//     io.on('connection', function (socket, id) {
//         socket.on('chat message', function (msg, id) {
//             socket.join(id)
//             socket.broadcast.to(id).emit("received", { message: msg, id });
//             let chat = new Room({
//                 message: msg
//             })
//             chat.save()
//             Lobby.findByIdAndUpdate(id, {
//                 $push: {
//                     messages: chat,
//                     code: newCode
//                 }
//             }).then(data => console.log(data))
//         })

//         // END OF CHAT MESSAGES
//         socket.on('send-code', (code) => {
//             socket.broadcast.emit('code-message', code)
//             newCode = new Code({
//                 code: code
//             })
//             newCode.save()
//         })
//     })
// }










module.exports = socket
