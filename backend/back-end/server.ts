import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// const router = require('./src/routes/clientRoutes');
// import connectDB from 'src/config/config';
import router from './src/routes/clientRoutes';
import invoiceRouter from './src/routes/invoiceRoutes';
import connectDB from './src/config/connectDB';
// let connectDB = require('./config/config');
import { errorHandler } from './src/middlewares/errorHandler';
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.use(express.json());

app.use('/api/client', router);
app.use('/api/companies', router);
app.use('/api/companiesCount', router);
app.use('/api/companiesPage', router);
app.use('/api/companyInfo', router);
app.use('/api/update', router);
app.use('/api/signIn', router);

// console.log('object');
app.use('/api/invoice', invoiceRouter);

// app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.get(
  '/',
  (req: express.Request, res: express.Response) => 'Express + TypeScript Server'
);

app.listen(port, () => {
  //   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
