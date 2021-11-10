# Instructions
#### Created using: Express.js, Node.js, PostgreSQL, Sequelize, JavaScript
#### I included a seed.js file to speed up the testing process instead of posting each transaction individually. Additional transactions can be added by using the POST 'localhost:8080/api/transactions' route.

________________________________________________________________________

### 0. Clone the repository.
* SSH: 'git clone git@github.com:avante-garde/transactions.git' or
* HTTPS: 'git clone https://github.com/avante-garde/transactions.git'

### 1. Install PostgreSQL and Postman or any other API testing tool.

### 2. Create the Postgres Database.
* 'createdb transactions'

### 3. Install node packages.
* 'npm install'

### 4. Start seeding the database.
* 'npm run seed'

### 5. Start the server.
* 'npm run start' or
* 'npm run start-server' which restarts server automatically when new changes are saved

### 6. You can test out the GET 'localhost:8080/api/transactions' route by making a Postman request. It should return an JSON object:
```
{
    "DANNON": 1100,
    "UNILEVER": 200,
    "MILLER COORS": 10000
}
```

### 7. To test out the POST 'localhost:8080/api/transactions/spend' route. Click on the Body tab and select raw format. Make sure that JSON is selected as an option on the dropdown to the right of GraphQL. Include the JSON object { "points": "5000" } as part of the request body. It should return an array of objects containing payer and points spent:
```
[
    {
        "payer": "DANNON",
        "points": -100
    },
    {
        "payer": "UNILEVER",
        "points": -200
    },
    {
        "payer": "MILLER COORS",
        "points": -4700
    }
]
```

### 8. A subsequent call to GET 'localhost:8080/api/transactions' should return a JSON object:
```
{
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5300
}
```