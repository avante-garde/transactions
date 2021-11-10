const db = require('./db');
const Transactions = require('./models/Transactions');

module.exports = {
  db,
  models: {
    Transactions,
  },
};
