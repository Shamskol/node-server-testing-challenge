const fs = require("fs");
const faker = require("faker");

const createFakeAccount = () => ({
  name: `${faker.random.uuid()}-${faker.finance.accountName()}`,
  amount: parseFloat(faker.finance.amount())
});

exports.seed = async function(knex) {
  const fakeAccounts = Array.from({ length: 100 }, _ =>
    createFakeAccount()
  );

  fs.writeFileSync(
    "./accountTest.json",
    JSON.stringify({ accounts: fakeAccounts })
  );
  
  return await knex("accounts").insert(fakeAccounts);
};
