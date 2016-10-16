'use strict';

const express = require("express"),
  router = express.Router(),
  knex = require("../db/knex");

router.get('/users', function(req, res) {
  var userID = Number.parseInt(req.session.user.id);
  knex('users').where('id', '=', userID).then(
    function(info) {
      res.render('users/index', {
        info: info
      });
    }).catch(function(err) {
    console.log(err);
  });
});

router.get('/users/:id/edit', function(req, res) {
  knex('users').where({
    id: req.params.id
  }).first().then(function(info) {
    res.render('users/edit', {
      info: info
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/:id', function(req, res) {
  knex('users').where({
    id: req.params.id
  }).update({
    user_name: req.body.user_name,
    updated_at: new Date()
  }).then(function() {
    res.redirect('/users');
  }).catch(function(err) {
    console.log(err);
  });
});

router.delete('/:id', function(req, res) {
  knex('users').where({
    id: req.params.id
  }).del().then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
