import { Router } from 'express';
import { getProfileController } from '@controllers/user.controller';

const userRouter = Router();

userRouter.get('/profile', getProfileController);

export default userRouter;
