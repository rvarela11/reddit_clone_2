'use strict';

const express = require("express"),
  router = express.Router(),
  knex = require("../db/knex");

router.get('/posts/:id/edit', function(req, res) {
  knex('posts').where({
    id: req.params.id
  }).first().then(function(post) {
    res.render('posts/edit', {
      post: post,
      formAction: '/posts/' + req.params.id + '?_method=PATCH'
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/posts/:id', function(req, res) {
  var cookieUserID = Number.parseInt(req.session.user.id);
  knex('posts').where({
    id: req.params.id
  }).update({
    title: req.body.title,
    body: req.body.body
  }).then(function() {
    res.redirect('/users/' + cookieUserID + '/posts');
  }).catch(function(err) {
    console.log(err);
  });
});

router.delete('/posts/:id', function(req, res) {
  var userID = Number.parseInt(req.session.user.id);
  knex('posts').where({
    id: req.params.id
  }).del().then(function() {
    res.redirect('/users/' + userID + '/posts');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
