const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const Lobby = require('../models/Lobby')


/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('userviews/signup');
});

router.post('/signup', (req, res, next) => {

  let theUsername = req.body.username;
  let thePassword = req.body.password;
  let theEmail = req.body.email;

  if (theUsername === "" || thePassword === "") {
    req.flash('error', 'please provide username and password it seems you have forgotten one or both')
    res.redirect('/signup')
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(thePassword, salt);


  User.create({
    username: theUsername,
    password: hashedPassword,
    email: theEmail
  })
    .then((user) => {
      res.redirect('/login')
    })
    .catch((err) => {
      req.flash('error', "username and email must be unique")
      res.redirect('/signup')
    })
})

router.get('/login', (req, res, next) => {
  res.render('userviews/login')
})


// router.post('/login', passport.authenticate('local', {
//   successRedirect: "/",
//   failureRedirect: '/login',
//   failureFlash: true,
//   passReqToCallback: true,
// }))

// SETS VALUE OF USER.IS_ACTIVE TO true
router.post('/login', passport.authenticate('local', {
  // successRedirect: "/",
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}), function (req, res) {
  req.user._id
  User.findByIdAndUpdate(req.user._id, {
    is_active: true
  }).then(user => {
    res.redirect('/')
  })
})

// AUTH USING SLACK

router.get("/auth/slack", passport.authenticate("slack"))

router.get("/auth/slack/callback",
  passport.authenticate("slack", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)

//AUTH USING GITHUB
router.get("/auth/github", passport.authenticate('github'))

router.get("/auth/github/callback",
  passport.authenticate('github', {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)


router.get('/lobby/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      // in case you want to render lobbies in the same page as form ->> jesus es un amawebo
      // Lobby.find({ $or: [{ friends: { $in: user.username } }, { creator: { $eq: user.username } }] })
      //   .then(lobby => {
      //     let userLobbies = lobby.map(lobbie => {
      //       return lobbie;
      //     })
      User.getAcceptedFriends(user, function (err, friendship) {
        res.render('userviews/lobby', { user, friendship })
      })
    })
})





//SETS VALUE OF USER.IS_ACTIVE TO FALSE
router.post('/logout', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    is_active: false
  }).then(user => {
    req.logout()
  }).then(() => {
    res.redirect('/');
  })
})

module.exports = router;
