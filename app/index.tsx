import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '../api/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Artificial delay to show the beautiful loading screen
    setTimeout(() => {
      loadProducts();
    }, 2000);
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 bg-slate-50 pt-4">
      <SearchBar value={search} onChangeText={handleSearch} />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12, paddingTop: 0 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-slate-400 text-lg font-medium">No se encontraron productos</Text>
          </View>
        }
      />
    </View>
  );
}
