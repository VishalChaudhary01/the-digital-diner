import { CookieOptions, Response } from 'express';
import { Env } from '@config/env.config';

type CookiePayloadType = {
  res: Response;
  token: string;
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: Env.NODE_ENV === 'production' ? true : false,
  sameSite: Env.NODE_ENV === 'production' ? 'strict' : 'lax',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  path: '/',
};

export const setAuthenticationCookies = ({
  res,
  token,
}: CookiePayloadType): Response =>
  res.cookie(Env.AUTH_COOKIE_NAME, token, cookieOptions);

export const clearAuthenticationCookies = (res: Response): Response =>
  res.clearCookie(Env.AUTH_COOKIE_NAME);
