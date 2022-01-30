import mongoose from 'mongoose';

import getConfig from './config';

const config = getConfig('dev');

const uri: string = config.MONGO_URI;

const connectDB = async () => {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB connected `);
  } catch (error: any) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
