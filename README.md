# Instructions
______________

## I included a seed.js file to speed up the testing process instead of posting each transaction individually. Additional transactions can be added by posting to localhost:8080/api/transactions.

### 0. Clone the repository.
* SSH: 'git clone git@github.com:avante-garde/transactions.git'
or\
* HTTPS: 'git clone https://github.com/avante-garde/transactions.git'

### 1. Install PostgreSQL and Postman or any other API testing tool.

### 2. Create the Postgres Database:
* 'createdb transactions'

### 3. Install node packages using:
* 'npm install'

### 4. Start seeding the database using:
* 'npm run start seed'

### 5. Start the server using:
* 'npm run start'
or\
* 'npm run start-server' which restarts server automatically when new changes are saved

### 6. You can test out the GET localhost:8080/api/transactions route by making a Postman request. It should return an JSON object:
```
{
    "DANNON": 1100,
    "UNILEVER": 200,
    "MILLER COORS": 10000
}
```

### 7. To test out the POST localhost:8080/api/transactions/spend route. Click on the Body tab and select raw format. Make sure that JSON is selected as an option on the dropdown to the right of GraphQL. Include the JSON object { "points": "5000" } as part a request body. It should return an array of objects containing payer and points spent:
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

### 8. A subsequent call to GET localhost:8080/api/transactions should return a JSON object:
```
{
    "DANNON": 1000,
    "UNILEVER": 0,
    "MILLER COORS": 5300
}
```