import Devconfig from './config.dev';
import Prodconfig from './config.prod';
import Env from '../types/env';

const getConfig = (type: string): Env => {
  if (type === 'dev') {
    console.log(Devconfig);

    return Devconfig;
  } else if (type === 'prod') {
    return Prodconfig;
  }
  return {
    PORT: undefined,
    MONGO_URI: undefined,
    JWT_SECRET: undefined,
  };
};

export default getConfig;
