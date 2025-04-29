import jwt from 'jsonwebtoken';
import { Env } from '@config/env.config';
import { User } from '@prisma/client';

type Unit = 's' | 'm' | 'h' | 'd';
type StringValues = `${number}${Unit}`;

type TokenPayload = {
  userId: User['id'];
};

export const signJwt = (payload: TokenPayload) => {
  return jwt.sign(payload, Env.JWT_SECRET, {
    expiresIn: Env.JWT_EXPIRES_IN as StringValues,
  });
};

export const verifyJwt = <TPayload extends object = TokenPayload>(
  token: string
) => {
  try {
    const payload = jwt.verify(token, Env.JWT_SECRET) as TPayload;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
