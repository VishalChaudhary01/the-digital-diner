import mongoose, { Document, Schema } from 'mongoose';
import { ItemCategoryEnum, ItemCategoryType } from '@enums/item-category.enum';

export interface MenuItemDocument extends Document {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: ItemCategoryType;
}

const menuItemSchema = new Schema<MenuItemDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
    category: {
      type: String,
      enum: Object.values(ItemCategoryEnum),
      required: true,
    },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model<MenuItemDocument>(
  'MenuItem',
  menuItemSchema
);
