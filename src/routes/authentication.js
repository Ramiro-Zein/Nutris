const express = require('express');
const router = express.Router();
const passport  = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local_signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
}));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});


router.post('/signin', (req, res, next) => {
    passport.authenticate('local_signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res, next);
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;