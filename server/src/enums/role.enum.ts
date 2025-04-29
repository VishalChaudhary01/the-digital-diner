import { Role } from '@prisma/client';

export const Permissions = {
  CREATE_MENUE_ITEM: 'CREATE_MENUE_ITEM',
  DELETE_MENUE_ITEM: 'DELETE_MENUE_ITEM',
  UPDATE_MENUE_ITEM: 'UPDATE_MENUE_ITEM',

  CREATE_ORDER: 'CREATE_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  CANCEL_ORDER: 'CANCEL_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',
  GET_ALL_ORDER: 'GET_ALL_ORDER',

  VIEW_ONLY: 'VIEW_ONLY',
} as const;

export const RolePermissions: Record<Role, Array<PermissionType>> = {
  ADMIN: [
    Permissions.CREATE_MENUE_ITEM,
    Permissions.DELETE_MENUE_ITEM,
    Permissions.UPDATE_MENUE_ITEM,

    Permissions.GET_ALL_ORDER,
    Permissions.UPDATE_ORDER,
    Permissions.DELETE_ORDER,
    Permissions.CREATE_ORDER,
    Permissions.CANCEL_ORDER,
    Permissions.VIEW_ONLY,
  ],
  USER: [
    Permissions.CREATE_ORDER,
    Permissions.CANCEL_ORDER,
    Permissions.VIEW_ONLY,
  ],
};

export type PermissionType = keyof typeof Permissions;
