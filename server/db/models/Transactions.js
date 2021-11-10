const Sequelize = require('sequelize');
const db = require('../db');

const Transactions = db.define('transactions', {
  payer: {
    type: Sequelize.STRING,
  },
  points: {
    type: Sequelize.INTEGER,
  },
  timestamp: {
    type: Sequelize.DATE,
  },
});

module.exports = Transactions;