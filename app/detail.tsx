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
            <View className="relative bg-white pb-10">
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-80 object-contain mt-10"
                    resizeMode="contain"
                />
                <TouchableOpacity
                    className="absolute top-4 left-4 bg-slate-100 p-2 rounded-full shadow-sm"
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-slate-50 rounded-t-[40px] -mt-8 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] min-h-[500px]">
                <View className="flex-row justify-between items-start mb-6">
                    <View className="bg-blue-100 px-3 py-1 rounded-full self-start">
                        <Text className="text-blue-800 text-xs font-bold uppercase tracking-widest">
                            {product.category}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        <Ionicons name="star" size={16} color="#fbbf24" />
                        <Text className="ml-1 text-slate-800 font-bold">{product.rating.rate}</Text>
                        <Text className="ml-1 text-slate-400 text-xs">({product.rating.count})</Text>
                    </View>
                </View>

                <Text className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
                    {product.title}
                </Text>

                <Text className="text-4xl font-extrabold text-blue-900 mb-8 tracking-tight">
                    ${product.price.toFixed(2)}
                </Text>

                <Text className="text-lg font-bold text-slate-800 mb-3">Descripción</Text>
                <Text className="text-slate-500 leading-7 text-base mb-12 font-medium">
                    {product.description}
                </Text>

                <TouchableOpacity className="bg-slate-900 py-5 rounded-2xl items-center shadow-xl active:opacity-90 flex-row justify-center">
                    <Ionicons name="cart-outline" size={24} color="white" style={{ marginRight: 8 }} />
                    <Text className="text-white font-bold text-lg tracking-wide">Agregar al Carrito</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
