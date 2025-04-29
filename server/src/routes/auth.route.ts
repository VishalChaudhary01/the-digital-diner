import { Router } from 'express';
import {
  logoutController,
  signinController,
  signupController,
} from '@controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);
authRouter.post('/logout', logoutController);

export default authRouter;
