import { prisma } from '@database/postgres/prisma/client';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { SigninInput, SignupInput } from '@validators/auth.validator';
import { BadRequestException, NotFoundException } from '@utils/app-error';
import { compareValue, hashValue } from '@utils/bcrypt';

export const signupService = async (data: SignupInput) => {
  const isExist = await prisma.user.findFirst({
    where: { phoneNumber: data.phoneNumber },
  });
  if (isExist) {
    throw new BadRequestException(
      'Phone number is already registered, Try to Login',
      ErrorCodeEnum.AUTH_PHONE_NUMBER_ALREADY_EXISTS
    );
  }
  const hashedPassword = await hashValue(data.password);
  const newUser = await prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: { id: true, name: true, phoneNumber: true, role: true },
  });

  return { user: newUser };
};

export const signinService = async (data: SigninInput) => {
  const user = await prisma.user.findFirst({
    where: { phoneNumber: data.phoneNumber },
  });
  if (!user) {
    throw new NotFoundException(
      'User not found with provided phone number',
      ErrorCodeEnum.AUTH_USER_NOT_FOUND
    );
  }
  const matchPassword = await compareValue(data.password, user.password);
  if (!matchPassword) {
    throw new BadRequestException('Invalid phone number or password');
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
  };
};
