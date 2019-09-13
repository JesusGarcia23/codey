
let friendButton = document.getElementById('friendsFBtn');
let pendingButton = document.getElementById('pendingFBtn');
let requestButton = document.getElementById('requestedFBtn');

let theFriendListTitle = document.getElementById('friendTitle');
let theFriendList = document.getElementById('listFriend');


friendButton.onclick = function () {
    axios.get('/friends')
    .then(response => {
        console.log(response.data)
        let friendAccepted = response.data.filter(eachFriend => {
            return eachFriend.status === "accepted"
        })
        console.log(friendAccepted);
        theFriendListTitle.innerHTML = ""
        let friendTitle = document.createElement('h2');
        let theTitle = document.createTextNode('Friends');
        friendTitle.appendChild(theTitle);
        theFriendList.innerHTML = "";
        theFriendListTitle.appendChild(friendTitle);
        friendAccepted.forEach(eachFriend => {
            let listElement = document.createElement('div');
            listElement.setAttribute('class', 'friendlist-div');
            let namePlace = document.createElement('p');
            let nameFriend = document.createTextNode(`${eachFriend.friend.username}`);
            namePlace.appendChild(nameFriend);
            let deleteForm = document.createElement('form');
            deleteForm.setAttribute('class', 'friendlist-item')
            deleteForm.setAttribute("action", `/delete/${eachFriend.friend._id}`)
            deleteForm.setAttribute('method', 'POST');

            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'deleteFriendBtn');
            let buttonText = document.createTextNode("Remove Friend");
            deleteButton.append(buttonText);
            deleteForm.append(deleteButton);
            listElement.append(namePlace);
            listElement.append(deleteForm);
            theFriendList.append(listElement);
           // theFriendList.append(deleteForm);

            })
        })
        .catch(err => console.log("An error just happened ", err));
}

pendingButton.onclick = function () {
    axios.get('/pending')
    .then(response => {
        console.log(response.data)
        let friendAccepted = response.data.filter(eachFriend => {
            return eachFriend.status === "pending"
        })
        console.log(friendAccepted);
        theFriendListTitle.innerHTML = ""
        let friendTitle = document.createElement('h2');
        let theTitle = document.createTextNode('Pending');
        friendTitle.appendChild(theTitle);
        theFriendList.innerHTML = ""
        theFriendListTitle.appendChild(friendTitle);
        friendAccepted.forEach(eachFriend => {
            let listElement = document.createElement('div')
            listElement.setAttribute('class', 'friendlist-div');
            let namePlace = document.createElement('p');
            let nameFriend = document.createTextNode(`${eachFriend.friend.username}`);
            namePlace.appendChild(nameFriend);
            let acceptForm = document.createElement('form');
            acceptForm.setAttribute("action", `/acceptRequest/${eachFriend.friend._id}`)
            acceptForm.setAttribute('method', 'POST');
            let addButon = document.createElement('button');
            addButon.setAttribute('class', 'addFriendBtn');
            let buttonText = document.createTextNode("Accept");

            let declineForm = document.createElement('form');
            declineForm.setAttribute("action", `/delete/${eachFriend.friend._id}`)
            declineForm.setAttribute('method', 'POST');
            let declineButton = document.createElement('button');
            declineButton.setAttribute('class', 'deleteFriendBtn')
            let declineButtonText = document.createTextNode("Decline");
            declineButton.append(declineButtonText);
            declineForm.append(declineButton);

            declineButton.append(declineButtonText);
            addButon.append(buttonText);
            acceptForm.append(addButon);
            declineForm.append(declineButton);
            listElement.append(namePlace);
            listElement.append(acceptForm);
            listElement.append(declineForm);
            theFriendList.append(listElement);
        })

    })
        .catch(err => console.log("An error just happened ", err));
}

requestButton.onclick = function () {
    axios.get('/requested')
    .then(response => {
        console.log(response.data)
        let friendAccepted = response.data.filter(eachFriend => {
            return eachFriend.status === "requested"
        })
        console.log(friendAccepted);
        theFriendListTitle.innerHTML = ""
        let friendTitle = document.createElement('h2');
        let theTitle = document.createTextNode('Requested');
        friendTitle.appendChild(theTitle);
        theFriendList.innerHTML = "";
        theFriendListTitle.appendChild(friendTitle);
        friendAccepted.forEach(eachFriend => {
            let listElement = document.createElement('div');
            listElement.setAttribute('class', 'friendlist-div');
            let namePlace = document.createElement('p');
            let textNode = document.createTextNode(`${eachFriend.friend.username}`);
            namePlace.append(textNode);
            listElement.append(namePlace);
            theFriendList.append(listElement);
        })
    })
        .catch(err => console.log("An error just happened ", err));
}

