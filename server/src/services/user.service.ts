import { User } from '@prisma/client';
import { prisma } from '@database/postgres/prisma/client';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { NotFoundException } from '@utils/app-error';

export const getProfileService = async (userId: User['id']) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { id: true, name: true, phoneNumber: true, role: true },
  });
  if (!user) {
    throw new NotFoundException(
      'User not found',
      ErrorCodeEnum.AUTH_USER_NOT_FOUND
    );
  }

  return { user };
};

export const getUserRoleService = async (userId: User['id']) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (!user) {
    throw new NotFoundException(
      'User not found',
      ErrorCodeEnum.AUTH_USER_NOT_FOUND
    );
  }

  return { role: user.role };
};
