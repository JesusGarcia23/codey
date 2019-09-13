
// const ul = document.getElementsByClassName('chatUserList')
// const container = document.getElementsByClassName('listOfUserFriends')

// // THIS ROUTE GETS ALL THE FRIENDS OF THE USER

// function setAttributes(el, attrs) {
//     for (var key in attrs) {
//         el.setAttribute(key, attrs[key]);
//     }
// }






// function getFriends() {
//     axios.get('/friends')
//         .then(response => {
//             response.data.friendship.map(item => {
//                 let userName = document.createTextNode(`${item.friend.username}`)
//                 let listElement = document.createElement('li')
//                 let input = document.createElement('input')
//                 setAttributes(input, {
//                     "type": "checkbox",
//                     "value": item.friend.username,
//                     "class": "userFriendName"

//                 })
//                 listElement.append(input)
//                 listElement.appendChild(userName)
//                 container[0].append(listElement)
//             })
//         })
//         .catch(err => console.log(err))
// }


// getFriends()








