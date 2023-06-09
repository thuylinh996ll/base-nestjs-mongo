import { getBaseSchema } from '../../shared/mongo.helper';
import { IShop } from './shop.interface';

const ShopSchema = getBaseSchema<IShop>();
ShopSchema.add({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String },
  address: { type: String },
  avatar: { type: String },
});
export { ShopSchema };
