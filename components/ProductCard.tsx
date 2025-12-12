import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../api/products';
import { useRouter } from 'expo-router';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    return (
        <TouchableOpacity
            className="bg-white rounded-lg shadow-md m-2 p-4 flex-row items-center border border-gray-100"
            onPress={() => router.push({ pathname: "/detail", params: { product: JSON.stringify(product) } })}
        >
            <Image
                source={{ uri: product.image }}
                className="w-20 h-20 rounded-md object-contain"
                resizeMode="contain"
            />
            <View className="flex-1 ml-4">
                <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
                    {product.title}
                </Text>
                <Text className="text-sm text-gray-500 capitalize" numberOfLines={1}>
                    {product.category}
                </Text>
                <Text className="text-xl font-bold text-green-600 mt-2">
                    ${product.price.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
