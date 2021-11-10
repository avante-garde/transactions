const { db, 
        models: { Transactions } 
} = require('./db');

const transactionsList = [
  { payer: "DANNON", points: 1000, timestamp: "2020-11-02T14:00:00Z" },
  { payer: "UNILEVER", points: 200, timestamp: "2020-10-31T11:00:00Z" },
  { payer: "DANNON", points: -200, timestamp: "2020-10-31T15:00:00Z" },
  { payer: "MILLER COORS", points: 10000, timestamp: "2020-11-01T14:00:00Z" },
  { payer: "DANNON", points: 300, timestamp: "2020-10-31T10:00:00Z" },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    for (const transaction of transactionsList) {
      try {
        await Transactions.create(transaction);
      } catch (error) {
        console.error(error);
      }
    }

  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;

if (require.main === module) {
  seed().then(() => {
    console.log('Seeding success!');
  }).catch(error => {
    console.error(error);
    db.close();
  });
}