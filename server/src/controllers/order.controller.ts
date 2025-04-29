import { Response } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';
import { HTTPSTATUS } from '@config/http.config';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { asyncHandler } from '@middlewares/async-handler';
import { UnauthorizedException } from '@utils/app-error';
import {
  cancelOrderService,
  createOrderService,
  getAllOrdersService,
  getOrdersService,
  updateOrderStatusService,
} from '@services/order.service';
import { createOrderSchema } from '@validators/order.validator';
import { statusSchema } from '@validators/common.validator';
import { getUserRoleService } from '@services/user.service';
import { roleGuard } from '@utils/role-gard';
import { Permissions } from '@enums/role.enum';
import { OrderStatus } from '@prisma/client';

export const createOrderController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const data = createOrderSchema.parse(req.body);
    const { order } = await createOrderService(userId, data);

    res.status(HTTPSTATUS.CREATED).json({
      message: 'Order placed successfully',
      order,
    });
  }
);

export const getOrdersController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const { orders } = await getOrdersService(userId);

    res.status(HTTPSTATUS.OK).json({
      message: 'Order fetched successfully',
      orders,
    });
  }
);

export const cancelOrderController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const orderId = req.params.orderId;
    await cancelOrderService(userId, orderId);

    res.status(HTTPSTATUS.OK).json({
      message: 'Order cancelled successfully',
    });
  }
);

export const updateOrderStatusController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const orderId = req.params.orderId;
    const status = statusSchema.parse(req.body.status) as OrderStatus;
    const { role } = await getUserRoleService(userId);
    roleGuard(role, [Permissions.UPDATE_ORDER]);

    const { updatedOrder } = await updateOrderStatusService(orderId, status);

    res.status(HTTPSTATUS.OK).json({
      message: 'Order updated successfully',
      updatedOrder,
    });
  }
);

export const getAllOrdersController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(
        'Unauthorize user',
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }
    const { role } = await getUserRoleService(userId);
    roleGuard(role, [Permissions.GET_ALL_ORDER]);

    const { allOrders } = await getAllOrdersService();

    res.status(HTTPSTATUS.OK).json({
      message: 'All orders fetched successfully',
      allOrders,
    });
  }
);
