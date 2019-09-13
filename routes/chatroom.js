const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Room = require('../models/Room')

const ensureLogin = require('connect-ensure-login');


router.get('/chats', (req, res, next) => {
    res.render('Chat/chatroom', { layout: false })
})





module.exports = router;