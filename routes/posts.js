'use strict';

var express = require("express"),
  router = express.Router(),
  knex = require("../db/knex"),
  cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'trackify',
  secret: 'some_secret_key'
}));

router.get('/users/:id/posts/new', function(req, res) {
  var userID = req.params.id;
  res.render("posts/new", {
    userID: userID
  });
});

router.post('/users/:id/posts/new', function(req, res) {
  var cookieUserID = Number.parseInt(req.session.user.id);
  var userID = req.params.id;
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: knex.select('id').from('users').where('id',
      userID)
  }).then(function(users) {
    res.redirect('/posts');
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/users/:id/posts', function(req, res) {
  var userID = req.params.id;
  knex('posts').where({
    user_id: userID
  }).orderBy('posts.id', 'desc').then(function(posts) {
    res.render("posts/single-thread", {
      posts: posts,
      userID: userID
    });
  });
});

router.get('/posts/:id/edit', function(req, res) {
  knex('posts').where({
    id: req.params.id
  }).first().then(function(post) {
    res.render('posts/edit', {
      post: post
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/posts/:id', function(req, res) {
  var userID = Number.parseInt(req.session.user.id);
  knex('posts').where({
    id: req.params.id
  }).update({
    title: req.body.title,
    body: req.body.body
  }).then(function() {
    res.redirect('/users/' + userID + '/posts');
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
