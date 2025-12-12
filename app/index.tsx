
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { getProducts, Product } from '../api/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingScreen from '../components/LoadingScreen';
import CategoryButton from '../components/CategoryButton';

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

  const handleCategorySelect = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    applyFilters(search, newCategory);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View>
        <SearchBar value={search} onChangeText={handleSearch} />
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <CategoryButton
              category={null}
              label="Todos"
              isSelected={selectedCategory === null}
              onPress={() => handleCategorySelect(null)}
            />
            {categories.map((cat) => (
              <CategoryButton
                key={cat}
                category={cat}
                label={cat}
                isSelected={selectedCategory === cat}
                onPress={() => handleCategorySelect(cat)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // slate-50
    paddingTop: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  listContent: {
    padding: 12,
    paddingTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#94a3b8', // slate-400
    fontSize: 18,
    fontWeight: '500',
  },
});
