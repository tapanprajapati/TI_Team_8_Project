/**
 * @author Samkit Shah [samkit@dal.ca]
 */

import { ProductModel } from '@core/model/product.model';
import { Observable } from 'rxjs';
export interface OrderDetailModel {
  orderId: number;
  item: item[];
  OrderDate: Date;
  DeliveredDate: Date;
  status: string;
  PickUpSlot: Date;
}
export interface item {
  name: string;
  imagePath?: Observable<string | null>;
  quantity: string;
  CategoryName: string;
  ItemId: number;
}
export interface OrderModel {
  orderId: number;
  userid: string;
  placedDate: string;
  pickupDate?: string;
  status: string;
  pickupSlot?: string;
}
