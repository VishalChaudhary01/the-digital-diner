import { getEnv } from '@utils/get-env';

export const envConfig = () => ({
  PORT: getEnv('PORT', '5000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  MONGO_DATABASE_URL: getEnv('MONGO_DATABASE_URL'),
  POSTGRES_DATABASE_URL: getEnv('POSTGRES_DATABASE_URL'),
});

export const Env = envConfig();
