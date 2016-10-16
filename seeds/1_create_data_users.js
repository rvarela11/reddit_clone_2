exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return Promise.all([
        knex('users').insert({
          id: 1,
          user_name: 'rvarela1',
          hashed_password: '$2a$10$snoZ3KGVlDQt27BC9K4t2ebAnsznBGVncW0HnYm.kKtUHe.Zxy1F6' // rvarela1
        }),
        knex('users').insert({
          id: 2,
          user_name: 'rvarela2',
          hashed_password: '$2a$10$gqZ37tayivPwvInHin447.aijHZavtap3fqcVhYvtGJdf7CAwGWnO' // rvarela2
        })
      ]);
    });
};
