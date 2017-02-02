var express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  port = process.env.PORT || 3000,
  knex = require("./db/knex"),
  bodyParser = require("body-parser"),
  indexRouter = require("./routes/index"),
  authRouter = require("./routes/auth"),
  usersRouter = require("./routes/users"),
  postsRouter = require("./routes/posts"),
  posts_users_id = require("./routes/posts_users_id"),
  commentsRouter = require("./routes/comments"),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session');

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(cookieSession({
  name: 'trackify',
  secret: 'some_secret_key'
}));

// Routes
app.use(indexRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(postsRouter);
app.use('/users/:id', posts_users_id);
app.use(commentsRouter);

app.get('/posts', function(req, res, next) {
  var userID = Number.parseInt(req.session.user.id);
  if (req.cookies.loggedIn) {
    knex('users').where('id', '=', userID).then(function(info) {
      knex('posts').then(function(posts) {
        knex('users').innerJoin('posts', 'users.id',
            'posts.user_id').orderBy('posts.id', 'desc')
          .then(
            function(usersAndPosts) {
              res.render('posts/index', {
                info: info,
                usersAndPosts: usersAndPosts
              });
            });
      });
    });
  } else {
    res.redirect('/login');
  }
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log("Server is listening on port 3000");
});

module.exports = app;
