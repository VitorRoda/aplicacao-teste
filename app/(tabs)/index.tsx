import { useCart } from '@/context/CartContext';
import { Product } from '@/domain/models/Product';
import { useIndexViewModel } from '@/presentation/viewmodels/IndexViewModel';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const { products, loading, error } = useIndexViewModel();

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.productDetails}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <Button type="outline" onPress={() => handleAddToCart(item)}>
              <Ionicons size={24} name={"cart"} />
            </Button>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  error: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  productDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#888',
  },
});