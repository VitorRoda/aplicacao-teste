import { Product } from '../models/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.getProducts();
  }
}
