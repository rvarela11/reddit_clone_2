'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: //'postgres://localhost/reddit_clone',
    {
      host: 'localhost',
      database: 'rc2-dev',
    },
  },

  test: {
    client: 'pg',
    connection: //'postgres//localhost/reddit_clone_test',
    {
      host: 'localhost',
      database: 'rc2-dev',
    }
  }

};
