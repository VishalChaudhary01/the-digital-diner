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
orderRouter.get('/myOrders', getOrdersController);

// Only Admin Routes
orderRouter.put('/updateStatus/:orderId', updateOrderStatusController);
orderRouter.get('/allOrders', getAllOrdersController);

export default orderRouter;
