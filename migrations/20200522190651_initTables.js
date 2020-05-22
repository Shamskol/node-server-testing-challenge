
exports.up = function(knex) {
    return knex.schema
    .createTable('accounts', tbl => {
      tbl.increments();
      tbl.string('name', 255)
         .unique();
      tbl.decimal('amount')
    })
};

  

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('accounts');
  
};
