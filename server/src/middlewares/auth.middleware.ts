import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '@utils/jwt';
import { Env } from '@config/env.config';
import { UnauthorizedException } from '@utils/app-error';
import { ErrorCodeEnum } from '@enums/error-code.enum';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[Env.AUTH_COOKIE_NAME];
    if (!token) {
      throw new UnauthorizedException(
        'Authentication token not found',
        ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND
      );
    }

    const { payload, error } = verifyJwt(token);
    if (error || !payload) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token',
        ErrorCodeEnum.AUTH_INVALID_TOKEN
      );
    }

    req.user = { id: payload.userId };
    next();
  } catch (err) {
    next(err);
  }
};
