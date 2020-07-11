
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id');
        table.string('username');
        table.string('phone');
        table.string('email');
        table.string('date');
        table.boolean('done');
        table.integer('user-created');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
