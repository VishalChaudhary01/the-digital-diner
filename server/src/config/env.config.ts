import { getEnv } from '@utils/get-env';

export const envConfig = () => ({
  PORT: getEnv('PORT', '5000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  FRONTEND_ORIGIN: getEnv('FRONTEND_ORIGIN'),
  MONGO_DATABASE_URL: getEnv('MONGO_DATABASE_URL'),
  POSTGRES_DATABASE_URL: getEnv('POSTGRES_DATABASE_URL'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '1d'),
  JWT_SECRET: getEnv('JWT_SECRET', 'secret'),
  AUTH_COOKIE_NAME: getEnv('AUTH_COOKIE_NAME', 'auth-token'),
});

export const Env = envConfig();
