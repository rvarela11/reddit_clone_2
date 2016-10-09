var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server.js');

var config = require('../knexfile')['test'];
var knex = require('knex')(config);

describe('Home Page', function() {
  it('should say Sign Up', function(done) {
    request(app).get('/').end(function(err, res) {
      expect(res.text).to.include('Sign Up');
      done();
    });
  });
});

describe('Sign Up Page', function() {
  it('should say Sign Up Page', function(done) {
    request(app).get('/signup').end(function(err, res) {
      expect(res.text).to.include('Sign Up Page');
      done();
    });
  });
});

describe('Login Page', function() {
  it('should say Login Page', function(done) {
    request(app).get('/login').end(function(err, res) {
      expect(res.text).to.include('Login Page');
      done();
    });
  });
});
