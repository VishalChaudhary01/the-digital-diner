import { Router } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import {
  createItemController,
  deleteItemController,
  getAllItemsController,
  getItemByIdController,
  updateItemController,
} from '@controllers/menu-item.controller';

const itemRouter = Router();

itemRouter.post('/', authMiddleware, createItemController);
itemRouter.put('/:itemId', authMiddleware, updateItemController);
itemRouter.delete('/:itemId', authMiddleware, deleteItemController);
itemRouter.get('/:itemId', getItemByIdController);
itemRouter.get('/', getAllItemsController);

export default itemRouter;
