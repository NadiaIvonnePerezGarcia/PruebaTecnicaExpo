import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Product } from '../api/products';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import FloatingCartButton from '../components/FloatingCartButton';

export default function Detail() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const product: Product = params.product ? JSON.parse(params.product as string) : null;

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#0f172a" />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.headerRow}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>
                                {product.category}
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#fbbf24" />
                            <Text style={styles.ratingText}>{product.rating.rate}</Text>
                            <Text style={styles.ratingCount}>({product.rating.count})</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>
                        {product.title}
                    </Text>

                    <Text style={styles.price}>
                        ${product.price.toFixed(2)}
                    </Text>

                    <Text style={styles.descriptionLabel}>Descripción</Text>
                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    <AddToCartButton product={product} />
                </View>
            </ScrollView>
            <FloatingCartButton />
        </View>
    );
}

function AddToCartButton({ product }: { product: Product }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handlePress = () => {
        if (status !== 'idle') return;

        setStatus('loading');

        setTimeout(() => {
            addToCart(product, quantity);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setQuantity(1); // Reset quantity after adding
            }, 2000);
        }, 500);
    };

    const incrementQuantity = () => {
        if (status === 'idle') {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (status === 'idle' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <View style={styles.addToCartContainer}>
            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
                <TouchableOpacity
                    style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                    onPress={decrementQuantity}
                    disabled={quantity <= 1 || status !== 'idle'}
                >
                    <Ionicons name="remove" size={24} color={quantity <= 1 ? '#94a3b8' : '#0f172a'} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={incrementQuantity}
                    disabled={status !== 'idle'}
                >
                    <Ionicons name="add" size={24} color="#0f172a" />
                </TouchableOpacity>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePress}
                style={[
                    styles.addButton,
                    status === 'success' && styles.addButtonSuccess,
                    status === 'loading' && styles.addButtonLoading
                ]}
            >
                {status === 'loading' ? (
                    <ActivityIndicator color="white" />
                ) : status === 'success' ? (
                    <>
                        <Ionicons name="checkmark-circle" size={24} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.addButtonText}>¡Agregado!</Text>
                    </>
                ) : (
                    <>
                        <Ionicons name="cart-outline" size={24} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.addButtonText}>
                            Agregar {quantity > 1 ? `(${quantity})` : ''}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    errorText: {
        color: '#ef4444',
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 320,
        marginTop: 40,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#f1f5f9',
        padding: 8,
        borderRadius: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -32,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 40,
        elevation: 5,
        minHeight: 500,
        paddingBottom: 120,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    categoryBadge: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 9999,
        alignSelf: 'flex-start',
    },
    categoryText: {
        color: '#1e40af',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    ratingText: {
        marginLeft: 4,
        color: '#1e293b',
        fontWeight: 'bold',
    },
    ratingCount: {
        marginLeft: 4,
        color: '#94a3b8',
        fontSize: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
        lineHeight: 34,
    },
    price: {
        fontSize: 36,
        fontWeight: '800',
        color: '#1e3a8a',
        marginBottom: 32,
        letterSpacing: -1,
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 12,
    },
    description: {
        color: '#64748b',
        lineHeight: 28,
        fontSize: 16,
        marginBottom: 32,
        fontWeight: '500',
    },
    addToCartContainer: {
        gap: 16,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    quantityButton: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
    },
    quantityButtonDisabled: {
        opacity: 0.5,
    },
    quantityText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        marginHorizontal: 32,
        minWidth: 40,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#0f172a',
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonSuccess: {
        backgroundColor: '#16a34a',
    },
    addButtonLoading: {
        backgroundColor: '#1e293b',
    },
    addButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.5,
    },
});
