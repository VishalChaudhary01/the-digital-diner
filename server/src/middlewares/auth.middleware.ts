import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '@utils/jwt';
import { Env } from '@config/env.config';
import { HTTPSTATUS } from '@config/http.config';
import { getErrorMessage } from '@utils/app-error';
import { ErrorCodeEnum } from '@enums/error-code.enum';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[Env.AUTH_COOKIE_NAME];
    if (!token) {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: 'Authentication token not found',
        errorCode: ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND,
      });
      return;
    }

    const { payload, error } = verifyJwt(token);
    if (error || !payload) {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: 'Invalid or expired authentication token',
        errorCode: ErrorCodeEnum.AUTH_INVALID_TOKEN,
      });
      return;
    }

    req.user = { id: payload.userId };
    next();
  } catch (err) {
    console.error('❌ Error in auth middleware:', err);
    res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
      error: getErrorMessage(err),
    });
    return;
  }
};
