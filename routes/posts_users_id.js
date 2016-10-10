'use strict';

var express = require("express"),
  router = express.Router({
    mergeParams: true
  }),
  knex = require("../db/knex"),
  cookieSession = require('cookie-session');

function checkUser(req, res, next) {
  let cookieUserID = Number.parseInt(req.session.user.id);
  let userID = Number.parseInt(req.params.id);
  if (cookieUserID === userID) {
    next();
  } else {
    res.send('no way jose');
  }
}
//:id/....
// router.param('id', (req, res, next, id) => {
// res.locals.user_id = id;
// })

router.use(cookieSession({
  name: 'trackify',
  secret: 'some_secret_key'
}));

router.get('/posts/new', function(req, res) {
  var userID = req.params.id;
  res.render("posts/new", {
    userID: userID,
    formAction: '/users/' + userID + '/posts/new'
  });
});

router.post('/posts/new', function(req, res) {
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

router.get('/posts', function(req, res) {
  var userID = Number.parseInt(req.params.id);
  knex('posts').where({
    user_id: userID
  }).orderBy('posts.id', 'desc').then(function(posts) {
    res.render("posts/single-thread", {
      posts: posts,
      userID: userID,
      cookie: req.session.user.id
    });
  });

});

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
