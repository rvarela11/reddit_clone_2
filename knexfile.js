'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'rc2-dev'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'rc2-dev'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    }
  }


};
