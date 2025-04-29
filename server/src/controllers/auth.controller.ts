import { Request, Response } from 'express';
import { HTTPSTATUS } from '@config/http.config';
import { asyncHandler } from '@middlewares/async-handler';
import { signinService, signupService } from '@services/auth.service';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '@utils/cookie';
import { signJwt } from '@utils/jwt';
import { signinSchema, signupSchema } from '@validators/auth.validator';

export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signupSchema.parse(req.body);
    const { user } = await signupService(data);
    const token = signJwt({ userId: user.id });

    setAuthenticationCookies({ res, token });
    res.status(HTTPSTATUS.OK).json({
      message: 'User registered successfully',
    });
  }
);

export const signinController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signinSchema.parse(req.body);
    const { user } = await signinService(data);
    const token = signJwt({ userId: user.id });

    setAuthenticationCookies({ res, token });
    res.status(HTTPSTATUS.OK).json({
      message: 'User logged in successfully',
    });
  }
);

export const logoutController = asyncHandler(
  async (_req: Request, res: Response) => {
    clearAuthenticationCookies(res);
    res.status(HTTPSTATUS.OK).json({
      message: 'User logged out successfully',
    });
  }
);
