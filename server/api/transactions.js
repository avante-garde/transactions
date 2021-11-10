const router = require('express').Router()
const { models: { Transactions }} = require('../db')
module.exports = router

// GET /api/transactions
// Retrieve points by payer as JSON object
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transactions.findAll({
      attributes: ['payer', 'points'],
    });

    const payersAndPoints = {};

    for (const transaction of transactions) {
      if (payersAndPoints[transaction.payer]) {
        payersAndPoints[transaction.payer] += transaction.points;
      }
      else {
        payersAndPoints[transaction.payer] = transaction.points;
      }
    }

    res.json(payersAndPoints);
  } catch (err) {
    next(err);
  }
});

// POST /api/transactions
// Add a new transaction to the Transactions table
router.post('/', async (req, res, next) => {
  try {
    await Transactions.create(req.body);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// POST /api/transactions/spend
// Spend points in order by oldest timestamp, create new transactions at the end based on points spent, 
// Return back a response containing total points each payer spent
router.post('/spend', async (req, res, next) => {
  try {
    let { points } = req.body;
    points = parseInt(points);

    // Get all the transactions sorted in ascending order by timestamp
    const transactions = await Transactions.findAll({
      order: [
        ['timestamp', 'ASC'],
      ]
    });
    const payersAndPoints = {};
    const payersAndPointsArr = [];

    for (const transaction of transactions) {
      // Stop spending points once number of points is 0
      if (points === 0) break;

      // If current points is greater than current oldest transaction's points, subtract by transaction points
      if (points > transaction.points) {
        if (payersAndPoints[transaction.payer]) {
          payersAndPoints[transaction.payer] -= transaction.points;
        }
        else {
          payersAndPoints[transaction.payer] = transaction.points * -1;
        }
        points -= transaction.points;
      }
      // Otherwise, current points is less than or equal to current oldest transaction's points, subtract remaining points
      else {
        if (payersAndPoints[transaction.payer]) {
          payersAndPoints[transaction.payer] -= points;
        }
        else {
          payersAndPoints[transaction.payer] = points * -1;
        }
        points = 0;
      }
    }

    // Add each payers points spent as a transaction
    // Also convert the JavaScript object payersAndPoints to an array of objects
    for (const payer in payersAndPoints) {
      await Transactions.create({ "payer": payer, "points": payersAndPoints[payer], "timestamp": new Date() });
      payersAndPointsArr.push({ "payer": payer, "points": payersAndPoints[payer] });
    }

    // Send back an array of objects containing payers and their points spent
    res.send(payersAndPointsArr);
  } catch (err) {
    next(err);
  }
});