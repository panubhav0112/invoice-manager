import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.PORT);

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
