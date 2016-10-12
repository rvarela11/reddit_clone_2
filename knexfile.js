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
    connection: 'postgres://maahslambruzur:_23eKARkyt2f2yPQRNQEyBgaIf@ec2-50-17-237-148.compute-1.amazonaws.com:5432/d6gtkf7k4ag2qm'
  }


};
