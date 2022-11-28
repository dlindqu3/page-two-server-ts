## pre-deployment package.json scripts:
- "start:build": "tsc -w",
- "start:run": "nodemon build/index.js",
- "start": "concurrently npm:start:*"


## deployed server on Render: 
- https://page-two-server.onrender.com/ 


## Environment Variables in Render:
NYT API Key as apiKey
mongoDB connection uri as MONGO_URI
PORT as 3000


## frontend repository on GitHub: 
- https://github.com/dlindqu3/page-two-frontend-ts


## Citations 
- I used the CORS setup as discussed by Mia Adjei in her article "Add CORS Support to Your Express + TypeScript API" [link](https://www.twilio.com/blog/add-cors-support-express-typescript-api)