import { Product } from '../models/Product';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}