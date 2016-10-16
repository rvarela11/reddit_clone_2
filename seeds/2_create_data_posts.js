exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          id: 1,
          title: 'Title Test 1',
          body: 'Body Test 1',
          user_id: 1
        }),
        knex('posts').insert({
          id: 2,
          title: 'Title Test 2',
          body: 'Body Test 2',
          user_id: 2
        })
      ]);
    });
};
