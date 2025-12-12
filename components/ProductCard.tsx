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
            className="bg-white rounded-xl shadow-sm m-2 p-4 flex-row items-center border border-slate-100"
            onPress={() => router.push({ pathname: "/detail", params: { product: JSON.stringify(product) } })}
        >
            <Image
                source={{ uri: product.image }}
                className="w-24 h-24 rounded-md object-contain"
                resizeMode="contain"
            />
            <View className="flex-1 ml-5 justify-between h-24 py-1">
                <View>
                    <Text className="text-base font-semibold text-slate-800 leading-tight" numberOfLines={2}>
                        {product.title}
                    </Text>
                    <Text className="text-xs text-slate-400 capitalize mt-1 font-medium tracking-wide">
                        {product.category}
                    </Text>
                </View>
                <Text className="text-lg font-bold text-blue-900">
                    ${product.price.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
