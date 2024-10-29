import { useCart } from '@/context/CartContext';
import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <>
      <Text style={styles.title}>Carrinho</Text>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>O carrinho está vazio</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemTitle}>{item.title}</Text>
                  <Text style={styles.cartItemPrice}>${item.price}</Text>
                  <Text style={styles.cartItemQuantity}>Quantidade: {item.quantity}</Text>
                  <Button title="Remover" onPress={() => handleRemoveFromCart(item.id)} />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});
