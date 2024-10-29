import { useState, useEffect } from 'react';
import { Product } from '../../domain/models/Product'
import { GetProducts } from '@/domain/usecases/GetProducts';
import { ProductRepositoryData } from '@/data/repositories/ProductRepositoryData';

export function useIndexViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductsUseCase = new GetProducts(new ProductRepositoryData());

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const products = await getProductsUseCase.execute();
      setProducts(products);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}
