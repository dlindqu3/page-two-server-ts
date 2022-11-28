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
-  Bjorn Krols, "Deploying a TypeScript Express application to Render", [link](https://technotrampoline.com/articles/deploying-a-typescript-express-application-to-render/)
- "Typescript support?", [link](https://community.render.com/t/typescript-support/377)
- "Deploy express + typescript as Render web service", [link](https://community.render.com/t/deploy-express-typescript-as-render-web-service/7374)