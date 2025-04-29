import 'dotenv/config';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { Env } from '@config/env.config';
import { prisma } from '@database/postgres/prisma/client';
import { errorHandler } from '@middlewares/error-handler';
import { authMiddleware } from '@middlewares/auth.middleware';
import { connectMongoDB } from '@database/mongo/connect-mongodb';

import authRoutes from '@routes/auth.route';
import userRoutes from '@routes/user.route';

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(`/`, (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Healthy server',
  });
});

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, authMiddleware, userRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await prisma.$connect();
  await connectMongoDB();
  console.log(
    `🚀 Server running at http://localhost:${Env.PORT} (in ${Env.NODE_ENV})`
  );
});
