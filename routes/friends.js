const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require("body-parser");





router.use((req, res, next) => {
    if (!req.user) {
        res.redirect("/login")
    }
    next()
})
//SEARCH USERS
router.get('/searchUser', (req, res, next) => {
    console.log(req.query.userToSearch);
    if (req.query.userToSearch === undefined) {
        res.render('friendviews/searchUserForm');
    } else {
        User.find({ username: { $eq: req.query.userToSearch } })
            .then(theUser => {
                if (theUser.length === 0) {
                    req.flash('error', 'There is no username with that name');
                    res.redirect('/searchUser');
                } else {
                    res.render('friendviews/searchUserForm', { theUser });
                }
            })
            .catch((err) => console.log("An error just happened ", err))
    }
})

//SHOW FRIENDLIST

router.get('/friendlist', (req, res, next) => {
    User.findById(req.user._id)
        .then(theUser => {
            User.getFriends(theUser, function (err, friendship) {
                res.render('friendviews/friendList', { theUser, friendship });
            })

        })
        .catch((err) => console.log("An err just happened", err))
})


//VERSION 1
router.post('/AddNewFriend', (req, res, next) => {
    User.findOne({ username: req.body.name })
        .then(user => {
            console.log(user);
            if(user === null){
                req.flash('error', `${req.body.name} does not exist!`);
                res.redirect('/searchUser');
            }
            else if(user.username === req.user.username){
                req.flash('error', ` You cannot add yourself`);
                res.redirect('/searchUser');
            }else{
            req.flash('success', `Your request to ${user.username} has been sent`);
            User.requestFriend(req.user._id, user._id);
            res.redirect('/searchUser');
        }
        })
        .catch((err) => console.log("An error just happened ", err))
})

router.post("/delete/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            User.removeFriend(req.user, user)
            res.redirect("/friendlist")
        })
})



router.post('/acceptRequest/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            User.requestFriend(req.user._id, user._id)
            res.redirect('/friendlist')
        })

})







module.exports = router;