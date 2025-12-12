
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { getProducts, Product } from '../api/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return [...new Set(cats)];
  }, [products]);

  const applyFilters = (searchText: string, category: string | null) => {
    let result = products;

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (searchText) {
      result = result.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()));
    }

    setFilteredProducts(result);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilters(text, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    applyFilters(search, newCategory);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 bg-slate-50 pt-4">
      <View>
        <SearchBar value={search} onChangeText={handleSearch} />
        <View className="mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            className="flex-row"
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCategorySelect(null as any)}
              className={`px-5 py-2.5 rounded-full border ${!selectedCategory
                ? 'bg-slate-900 border-slate-900 shadow-md'
                : 'bg-white border-slate-200'
                }`}
            >
              <Text className={`font-semibold text-sm ${!selectedCategory ? 'text-white' : 'text-slate-600'}`}>
                Todos
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => handleCategorySelect(cat)}
                className={`px-5 py-2.5 rounded-full border ${selectedCategory === cat
                  ? 'bg-slate-900 border-slate-900 shadow-md'
                  : 'bg-white border-slate-200'
                  }`}
              >
                <Text className={`font-semibold capitalize text-sm ${selectedCategory === cat ? 'text-white' : 'text-slate-600'}`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12, paddingTop: 4 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-slate-400 text-lg font-medium">No se encontraron productos</Text>
          </View>
        }
      />
    </View>
  );
}
