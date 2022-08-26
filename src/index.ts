import express, { Request, Response, NextFunction } from "express"; 
import "dotenv/config"; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bestsellersRoutes from './routes/bestsellers'; 
import cors from 'cors';

const app = express(); 

// middleware 
const allowedOrigins = ['http://localhost:3000', 'https://page-two-mern-ts.netlify.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message}); 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes 
app.use('/api', bestsellersRoutes); 

app.get('/', (req: Request, res: Response) => {
  res.send('express/ts app is working')
})

// heroku will look for a 'PORT' env variable
const PORT = process.env.PORT || 5500;

// connect to db
mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to mongoDB and listening on port ${process.env.PORT}`)
    })
  })
  .catch((error: Error) => {
    console.log(error)
  })