const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/friends', (req, res, next)=>{
    User.findById(req.user._id)
    .then(theUser => {
        User.getFriends(theUser, function(err, friendship){
            res.json(friendship);
        })
        
    })
    .catch(err => console.log("An error just happened ", err))
})

router.get('/pending', (req, res, next)=>{
    User.findById(req.user._id)
    .then(theUser => {
        User.getFriends(theUser, function(err, friendship){
            res.json(friendship);
        })
        
    })
    .catch(err => console.log("An error just happened ", err))
})

router.get('/requested', (req, res, next)=>{
    User.findById(req.user._id)
    .then(theUser => {
        User.getFriends(theUser, function(err, friendship){
            res.json(friendship);
        })
        
    })
    .catch(err => console.log("An error just happened ", err))
})



module.exports = router;