import { Request, Response } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';
import { HTTPSTATUS } from '@config/http.config';
import { asyncHandler } from '@middlewares/async-handler';
import { UnauthorizedException } from '@utils/app-error';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { getUserRoleService } from '@services/user.service';
import { roleGuard } from '@utils/role-gard';
import { Permissions } from '@enums/role.enum';
import {
  createItemSchema,
  updateItemSchema,
} from '@validators/menu-item.validator';
import {
  createItemService,
  deleteItemService,
  getAllItemsService,
  getItemByIdService,
  updateItemService,
} from '@services/menu-item.service';
import { SortByEnum } from '@enums/sort.enum';

export const createItemController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const data = createItemSchema.parse(req.body);

    const { role } = await getUserRoleService(userId);
    roleGuard(role, [Permissions.CREATE_MENUE_ITEM]);

    const { createdItem } = await createItemService(data);

    res.status(HTTPSTATUS.CREATED).json({
      message: `Item ${createdItem.name} added to menue successfully`,
      data: {
        createdItem,
      },
    });
  }
);

export const updateItemController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const itemId = req.params.itemId;
    const data = updateItemSchema.parse(req.body);

    const { role } = await getUserRoleService(userId);
    roleGuard(role, [Permissions.UPDATE_MENUE_ITEM]);

    const { updatedItem } = await updateItemService(itemId, data);

    res.status(HTTPSTATUS.OK).json({
      message: `Item ${updatedItem.name} updated successfully`,
      data: {
        updatedItem,
      },
    });
  }
);

export const getAllItemsController = asyncHandler(
  async (req: Request, res: Response) => {
    const filters = {
      category: req.query.category?.toString().split(','),
      available: req.query.available?.toString(),
      keyword: req.query.keyword?.toString(),
      sortBy: req.query.sortBy as SortByEnum,
    };

    const _pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 10,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const { items, pagination } = await getAllItemsService(
      filters,
      _pagination
    );

    res.status(HTTPSTATUS.OK).json({
      message: `All Items fetched successfully`,
      data: {
        items,
        pagination,
      },
    });
  }
);

export const getItemByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const itemId = req.params.itemId;
    const { item } = await getItemByIdService(itemId);
    res.status(HTTPSTATUS.OK).json({
      message: `Item ${item.name} fetched successfully`,
      data: {
        item,
      },
    });
  }
);

export const deleteItemController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req?.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const itemId = req.params.itemId;
    const { role } = await getUserRoleService(userId);
    roleGuard(role, [Permissions.DELETE_MENUE_ITEM]);

    const { deletedItem } = await deleteItemService(itemId);

    res.status(HTTPSTATUS.OK).json({
      message: `Item ${deletedItem.name} deleted successfully`,
    });
  }
);
