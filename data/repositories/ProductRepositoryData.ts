import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/Product';

export class ProductRepositoryData implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return data as Product[];
  }
}
