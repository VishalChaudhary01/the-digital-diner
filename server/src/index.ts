import 'dotenv/config';
import express, { Request, Response } from 'express';
import { Env } from '@config/env.config';

const app = express();

app.use(express.json());

app.get(`/`, (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Healthy server',
  });
});

app.listen(Env.PORT, async () => {
  console.log(
    `🚀 Server running at http://localhost:${Env.PORT} (in ${Env.NODE_ENV})`
  );
});
