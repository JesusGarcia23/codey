
const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../../models/Room')
const Lobby = require('../../models/Lobby')
const url = require('url')


router.route("/history").get((req, res, next) => {
  let actualUrl = req.headers.referer;
  var navUrl = url.parse(actualUrl, true);
  let hUrl = navUrl.pathname.split('/');
  let realUrl = hUrl[2];
 // console.log(hUrl)

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  Lobby.findById(realUrl)
    .then(theLobby => {
      Room.find({ _id: { $in: theLobby.messages } })
        .then(chat => {
          res.json(chat);
        }).catch(err => console.log("An error", err))
    }).catch(otherErr => console.log("Another err ", otherErr));
});

// router.route("/history").get((req, res, next) => {
//   let actualUrl = req.headers.referer;
//   console.log(actualUrl)
//   var navUrl = actualUrl.parse(actualUrl, true);
//   // let hUrl = navUrl.pathname.split('/');
//   // let realUrl = hUrl[2];

//   res.setHeader("Content-Type", "application/json");
//   res.statusCode = 200;
//   Lobby.findById()

//   let data = Room.find({ message: "Anonymous" });
//   Room.find({}).then(chat => {
//     res.json(chat);
//   });
// });




module.exports = router;