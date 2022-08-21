## deployment
- package.json: heroku runs build then start scripts

## pre-deployment package.json scripts:
- "start:build": "tsc -w",
- "start:run": "nodemon build/index.js",
- "start": "concurrently npm:start:*"

## package.json scripts for deployment to heroku:
- "start": "node build/index.js",
- "build": "tsc"

## config vars in heroku:
NYT API Key as apiKey
mongoDB connection uri as MONGO_URI
PORT as 3000