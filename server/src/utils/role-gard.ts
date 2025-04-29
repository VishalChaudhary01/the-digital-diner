import { PermissionType, RolePermissions } from '@enums/role.enum';
import { UnauthorizedException } from './app-error';
import { ErrorCodeEnum } from '@enums/error-code.enum';

export const roleGuard = (
  role: keyof typeof RolePermissions,
  requiredPermissions: PermissionType[]
) => {
  const permissions = RolePermissions[role];
  const hasPermission = requiredPermissions.every((permission) =>
    permissions.includes(permission)
  );
  if (!hasPermission) {
    throw new UnauthorizedException(
      'You do not have the necessary permissions to perform this action',
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }
};
