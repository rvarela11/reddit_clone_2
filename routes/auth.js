'use strict';

const express = require("express"),
  router = express.Router(),
  knex = require("../db/knex"),
  bcrypt = require('bcrypt');

router.get('/signup', function(req, res, next) {
  res.render('signup/index');
});

router.post('/signup', function(req, res, next) {
  knex('users').where({
    user_name: req.body.user_name
  }).first().then(function(user, err) {
    if (!user) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        knex('users').insert({
          user_name: req.body.user_name,
          hashed_password: hash
        }).then(function() {
          res.render('index/congrats');
        });
      });
    } else {
      res.redirect('/signup');
    }
  });
});

router.get('/login', function(req, res, next) {
  res.render('login/index')
})

router.post('/login', function(req, res, next) {
  knex('users').where({
      user_name: req.body.user_name,
    }).first().then(function(user) {
      if (!user) {
        res.send("Unauthorized User");
      }
      bcrypt.compare(req.body.password, user.hashed_password, function(
        err, result) {
        if (user && result === true) {
          req.session.user = user;
          res.cookie('loggedIn', {
            signed: true
          });
          res.redirect('/posts');
        } else {
          res.redirect('/login');
        }
      });
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/logout', function(req, res) {
  res.clearCookie('loggedIn');
  res.redirect('/');
});

module.exports = router;
