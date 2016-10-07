exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("comments", function(table) {
    table.increments().primary();
    table.text("content");
    table.bigInteger("post_id").unsigned().index().references('id').inTable(
      'posts').onDelete('cascade');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable(
      'users').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
