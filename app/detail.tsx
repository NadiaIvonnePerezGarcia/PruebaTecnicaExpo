import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Product } from '../api/products';
import { Ionicons } from '@expo/vector-icons';

export default function Detail() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const product: Product = params.product ? JSON.parse(params.product as string) : null;

    if (!product) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-red-500">Error: Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
            <View className="relative">
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-80 object-contain bg-white"
                    resizeMode="contain"
                />
                <TouchableOpacity
                    className="absolute top-4 left-4 bg-gray-100 p-2 rounded-full shadow-sm"
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-gray-50 rounded-t-3xl -mt-6 p-6 shadow-inner min-h-[500px]">
                <View className="flex-row justify-between items-start mb-4">
                    <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wider flex-1 mr-4">
                        {product.category}
                    </Text>
                    <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded-md">
                        <Ionicons name="star" size={16} color="#eab308" />
                        <Text className="ml-1 text-yellow-700 font-bold">{product.rating.rate}</Text>
                        <Text className="ml-1 text-gray-400 text-xs">({product.rating.count})</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.title}
                </Text>

                <Text className="text-3xl font-extrabold text-green-600 mb-6">
                    ${product.price.toFixed(2)}
                </Text>

                <Text className="text-lg font-bold text-gray-800 mb-2">Descripción</Text>
                <Text className="text-gray-600 leading-6 text-base mb-10">
                    {product.description}
                </Text>

                {/* Placeholder button for 'Add to Cart' simulation */}
                <TouchableOpacity className="bg-[#f4511e] py-4 rounded-xl items-center shadow-lg active:opacity-90">
                    <Text className="text-white font-bold text-lg">Agregar al Carrito</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
