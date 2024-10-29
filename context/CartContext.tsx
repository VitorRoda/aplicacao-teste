import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../domain/models/Product';
import Toast from 'react-native-toast-message';
import { CartItem } from '@/domain/models/CartItem';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    Toast.show({
      type: 'success',
      text1: 'Produto adicionado ao carrinho',
      text2: `${product.title} foi adicionado com sucesso!`,
      position: 'bottom',
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};