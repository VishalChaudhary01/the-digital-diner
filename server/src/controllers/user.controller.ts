import { Response } from 'express';
import { HTTPSTATUS } from '@config/http.config';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { UnauthorizedException } from '@utils/app-error';
import { asyncHandler } from '@middlewares/async-handler';
import { getProfileService } from '@services/user.service';
import { AuthRequest } from '@middlewares/auth.middleware';

export const getProfileController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req?.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const { user } = await getProfileService(userId);

    res.status(HTTPSTATUS.OK).json({
      message: 'Profile Fetched successfully',
      user,
    });
  }
);
