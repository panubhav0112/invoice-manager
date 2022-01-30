interface Env {
  PORT: string | undefined;
  MONGO_URI: string | undefined;
  JWT_SECRET: string | undefined;
}

export default Env;
