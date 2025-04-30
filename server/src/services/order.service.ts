import { Types } from 'mongoose';
import { MenuItem } from '@database/mongo/models/MenuItem.model';
import { prisma } from '@database/postgres/prisma/client';
import { OrderStatus } from '@prisma/client';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { CreateOrderInput } from '@validators/order.validator';
import { BadRequestException, NotFoundException } from '@utils/app-error';

export const createOrderService = async (
  userId: string,
  data: CreateOrderInput
) => {
  // Ensure all IDs are ObjectIds
  const menuItemIds = data.items.map((i) => new Types.ObjectId(i.menuItemId));
  // Fetch requested all menu items
  const menuItems = await MenuItem.find({
    _id: { $in: menuItemIds },
  });
  // Check if all menu items exist and are available
  const menuItemMap = new Map(
    menuItems.map((item) => [item._id?.toString(), item])
  );

  const orderItems = data.items.map(({ menuItemId, quantity }) => {
    const item = menuItemMap.get(menuItemId);
    if (!item) {
      throw new NotFoundException(
        `MenuItem ${menuItemId} not found (Unknown item)`
      );
    }

    if (!item.isAvailable) {
      throw new NotFoundException(
        `MenuItem ${item.name} is currently not available`
      );
    }

    return {
      menuItemId,
      quantity,
      priceAtOrder: item.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      userId,
      orderItems: {
        create: orderItems,
      },
    },
    include: { orderItems: true },
  });

  return { order };
};

export const getOrdersService = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { orderItems: true },
    orderBy: { createdAt: 'desc' },
  });

  return { orders };
};

export const cancelOrderService = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId, userId },
  });
  if (!order) {
    throw new NotFoundException(
      'Order not found',
      ErrorCodeEnum.ORDER_NOT_FOUND
    );
  }
  if (order.status !== OrderStatus.PENDING) {
    throw new BadRequestException('Only pending orders can be cancelled');
  }

  const cancelledOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status: OrderStatus.CANCEL },
  });

  return { cancelledOrder };
};

export const getAllOrdersService = async () => {
  const allOrders = await prisma.order.findMany({
    include: { orderItems: true },
    orderBy: { completedAt: 'desc' },
  });

  return { allOrders };
};

export const updateOrderStatusService = async (
  orderId: string,
  status: OrderStatus
) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    throw new NotFoundException(
      'Order not found',
      ErrorCodeEnum.ORDER_NOT_FOUND
    );
  }

  if (order.status === OrderStatus.CANCEL) {
    throw new BadRequestException('You can not update cancelled order');
  }

  if (status === OrderStatus.DELIVERED) {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status, completedAt: new Date() },
    });
    return { updatedOrder };
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return { updatedOrder };
};
