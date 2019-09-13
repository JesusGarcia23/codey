const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Code = require('../../models/Code')


router.get("/code", (req, res, next) => {
    Code.find({})
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.post('/code', (req, res, next) => {
    const code = Code.find({})
    code.update({
        code: req.body.code
    }).then(response => {
        res.json({ message: "working" })
    })
        .catch(err => console.log(err))
})



module.exports = router