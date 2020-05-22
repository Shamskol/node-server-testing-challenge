const express = require("express");
const Account = require("../data/helpers/accountsDb");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome"
  });
});

app
  .route("/accounts/")
  .get(async (req, res) => {
    try {
      const accounts = await Account.get();
      return res.status(200).json(accounts);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message:
          "We encountered an error getting the accounts from the database"
      });
    }
  })

  .post(async (req, res) => {
    const account = {
      ...req.body,
      amount: parseFloat(req.body.amount)
    };

    if (!account.name || !account.amount) {
      return res.status(400).json({ message: "Missing data" });
    }

    try {
      const newAccount = await Account.create(account);
      return res.status(201).json(newAccount);
    } catch (e) {
      res.status(500).json({
        error: "We encountered an issue creating your account"
      });
    }
  });

app.route("/accounts/:id").delete(async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.get(id);
    
    if (!account) {
      return res.status(404).json({
        message: "No account found with that ID"
      });
    }

    await Account.remove(id);
    
    return res.status(204).end();
  } catch (e) {
    res.status(500).json({
      error: "We encountered an issue creating your account"
    });
  }
});

module.exports = app;
