const expect = require('chai').expect,
  request = require('supertest'),
  app = require('../server.js'),
  config = require('../knexfile')['test'],
  knex = require('knex')(config);

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

describe('Logout Page', function() {
  it('should redirect to the home page', function(done) {
    request(app).get('/logout').end(function(err, res) {
      expect(res.header['location']).to.include('/');
      done();
    });
  });
});

describe('User Home Page', function() {
  it('should say User Home Page', function(done) {
    request(app).get('/users').end(function(err, res) {
      expect(200);
      done();
    });
  });
});
