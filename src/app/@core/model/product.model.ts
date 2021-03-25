/**
 * @author Parth Parmar <parth.parmar@default.ca>
 * Model for Product resource
 */
import { CategoryModel } from '@core/model/category.model';
import { Observable } from 'rxjs';

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  limit: number;
  availableQuantity: number;
  imagePath: Observable<string | null>;
  category: CategoryModel;
}
