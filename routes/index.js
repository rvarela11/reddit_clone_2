'use strict';

const express = require("express"),
  router = express.Router(),
  knex = require("../db/knex");

router.get('/', function(req, res, next) {
  res.render('index/index')
})

module.exports = router;
