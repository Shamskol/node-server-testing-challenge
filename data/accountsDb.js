const db = require('../index');
module.exports = {
  get,
  create,
  remove
};

function get(id) {
  if (id)
    return db('accounts')
      .select('name', 'amount')
      .where({ id })
      .first()
  else return db('accounts').select('name', 'amount');
}

async function create(account) {
  const [ id ] = await db('accounts').insert(account);
  return get(id);
}

function remove(id) {
  return db('accounts')
    .where({ id })
    .del()
}