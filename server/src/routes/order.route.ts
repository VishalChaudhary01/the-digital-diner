import { Router } from 'express';
import {
  cancelOrderController,
  createOrderController,
  getAllOrdersController,
  getOrdersController,
  updateOrderStatusController,
} from '@controllers/order.controller';

const orderRouter = Router();

orderRouter.post('/', createOrderController);
orderRouter.put('/cancel/:orderId', cancelOrderController);
orderRouter.get('/my-orders', getOrdersController);

// Only Admin Routes
orderRouter.put('/update-status/:orderId', updateOrderStatusController);
orderRouter.get('/all-orders', getAllOrdersController);

export default orderRouter;
