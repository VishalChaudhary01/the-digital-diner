import {
  MenuItem,
  MenuItemDocument,
} from '@database/mongo/models/MenuItem.model';
import { ErrorCodeEnum } from '@enums/error-code.enum';
import { NotFoundException } from '@utils/app-error';
import {
  buildItemQuery,
  buildSortOption,
  ItemFilters,
  PaginationParams,
} from '@utils/filters-sorts';
import {
  CreateItemInput,
  UpdateItemInput,
} from '@validators/menu-item.validator';

export const createItemService = async (data: CreateItemInput) => {
  const createdItem = await MenuItem.create(data);

  return { createdItem };
};

export const updateItemService = async (
  itemId: MenuItemDocument['_id'],
  data: UpdateItemInput
) => {
  const updatedItem = await MenuItem.findByIdAndUpdate(itemId, data, {
    new: true,
  });
  if (!updatedItem) {
    throw new NotFoundException(
      'Menu item not found',
      ErrorCodeEnum.MENU_ITEM_NOT_FOUND
    );
  }

  return { updatedItem };
};

export const deleteItemService = async (itemId: MenuItemDocument['_id']) => {
  const deletedItem = await MenuItem.findByIdAndDelete(itemId);
  if (!deletedItem) {
    throw new NotFoundException(
      'Menu item not found',
      ErrorCodeEnum.MENU_ITEM_NOT_FOUND
    );
  }

  return { deletedItem };
};

export const getItemByIdService = async (itemId: MenuItemDocument['_id']) => {
  const item = await MenuItem.findById(itemId);
  if (!item) {
    throw new NotFoundException(
      'Menu item not found',
      ErrorCodeEnum.MENU_ITEM_NOT_FOUND
    );
  }

  return { item };
};

export const getAllItemsService = async (
  filters: ItemFilters,
  pagination: PaginationParams
) => {
  const query = buildItemQuery(filters);
  const sort = buildSortOption(filters.sortBy);

  const { pageNumber, pageSize } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [items, totalCount] = await Promise.all([
    MenuItem.find(query).sort(sort).skip(skip).limit(pageSize),
    MenuItem.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    items,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};
