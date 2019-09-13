let theUrl = window.location.href
let splitUrl = window.location.href.split('/');
let myRoomId = splitUrl[4];


var socket = io();

let id = $('.chatroomID').html()
var messages = document.getElementById("messages");
let theUser = $('.theUser').html();
// let theSocketAttach = $('.theActualSockey');
let button = document.getElementsByClassName('removeBtn');
// let theSockedId = $('.theActualSockey').html();

(function () {
    // let myData = {name: theUser, userId: socket.id};
    console.log("CLIENT SIDE");

    
  socket.emit('joinRoom', myRoomId);
   



//TESTING THE ROOM
// socket.on('sendRoom', function(data){
//     console.log(data.theRoom);
// })

//SHOW ACTUAL ROOM
// socket.on('actualRoom', function(data) {
//     console.log("THE ACTUAL ROOM IS");
//     console.log(data.actualRoom);
// });

    socket.emit('set-user', theUser);

    $("#sendForm").submit(function (e) {
        // socket.emit("connection");
        e.preventDefault();
        let li = document.createElement("li");
        li.setAttribute('class', 'senderMsg');
        socket.emit("chat message", { msg: $("#message").val(), sender: theUser});
        messages.appendChild(li).append($("#message").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + theUser + ": " + "just now");
        $("#message").val("");
        return false;
    })

    //DISPLAY ID
socket.on('listOfUsers', function(data){
    console.log("USERS LIST: ");
    console.log(data[0]);
    for(let i = 0; i < data.length; i++){
       for(let j = 0; j < button.length; j++){
           if(data[i].userName === button[j].value){
            button[i].setAttribute('name', data[i].userId);
           }
       }
    }
    // for(let i = 0; i < button.length; i++){
    //     if(butt)
    // }



    // for(let i =0; i < button.length; i++){
    //     if(button[i].value === data.theUser){
    //         button[i].setAttribute('name', data.theId);
    //     }
    // }
    // for(let key in data){
    //     // console.log(key + ":" + data[key]);
    //     for (let i = 0; i < button.length; i++) {
    //         if (button[i].value === data[key]) {
    //             button[i].setAttribute("name", key)
    //         }
    //     } 
    // }
});
    // socket.on('setSocketId', function(data) {
    //     console.log(data);
    //     theSocketAttach.text(data.theId);
    // });

    socket.on("received", (data) => {
        // console.log(JSON.stringify(data));
        let li = document.createElement("li");
        let span = document.createElement("span");
        li.setAttribute('class', 'receiverMsg');
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + data.sender + ": " + "just now");
    });
})();

(async function () {
    await fetch("/history")
        .then(data => {
            return data.json();
        })
        .then(json => {
            //  console.log(json[0]);
            json.map(data => {
                //   console.log(data);
                let li = document.createElement("li");
                let span = document.createElement("span");
                if(data.sender === theUser){
                    li.setAttribute('class', 'senderMsg');
                }else{
                    li.setAttribute('class', 'receiverMsg');
                }
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.sender + ": " + formatTime(new Date(data.createdAt)));
                // .append("by " + data.sender + ": " + new Date(data.createdAt).getHours() + ":"  + new Date(data.createdAt).getMinutes());
            })
        }).catch(err => console.log("An error happened fetching ", err));
})();

//REDIRECT
// socket.on('redirect', function(destination) {
//     window.location.href = destination;
// });
//BUTTON TO DELETE
// socket.on('setSocketId', function (data) {
//     console.log(data)
    // for (let i = 0; i < button.length; i++) {
    //     if (button[i].value === data.name) {
    //         button[i].setAttribute("name", data.theId)
    //     }
    // }
// });
// for (let i = 0; i < button.length; i++) {
//     button[i].addEventListener("click", () => {
//         e.preventDefault();
//         console.log(button[i].value)
//         socket.emit("kicked", { theUserId: theSockedId});
//     })
// }
(function () {
    $('#js').change(() => {
        let textarea = $('#js')
        let da = textarea.val()
        textarea.html("")
        // socket.emit('send-code', message)
        axios.get('/code')
            .then(response => {
                da = response.data.code
            })
        socket.emit("send-code", da)
    })
    socket.on('code-message', data => {
        code.value = data
    });
})();



// fetching initial chat messages from the database

//is typing...

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
    socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
    typing.innerText = data.user + " " + data.message;
    console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
    socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
    typing.innerText = '';
});




//FORMAT TIME
function formatTime(dateStr) {
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let theMonth = dateStr.getMonth();
    theMonth = monthArray[theMonth - 1]
    let theDay = dateStr.getDate();
    let theHours = dateStr.getHours();
    let theMinutes = dateStr.getMinutes();
    if (theHours > 12) {
        theHours -= 12;
        return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " PM";
    } else if (theHours === 0) {
        theHours = 12
        return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " AM";
    }
    return theMonth + ", " + theDay + " " + theHours + ":" + theMinutes + " AM";

};

socket.on('showUsersDb', function(data){
    console.log("THE DATABASE IS");
    console.log(data);
});


socket.on('exitChat', function(data){
    window.location.href = data;
});

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
        console.log(button[i].value)
        socket.emit("kicked", button[i].name);
    })
}

// let theRemoverUserChatBtn = document.getElementById('removeUserChatBtn');
// theRemoverUserChatBtn.onclick = function(){
//     let theChatHeader = document.getElementById('chatRoomHead');
//     let theMeta = document.createElement('meta');
//     theMeta.setAttribute('http-equiv', 'refresh');
//     theMeta.setAttribute('content', '1');
//     theMeta.setAttribute('url', '/userChats/{{lobby._id}}');
//     theChatHeader.append(theMeta);

// }