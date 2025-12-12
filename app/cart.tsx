import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CartScreen() {
    const { items, removeFromCart, getTotal, clearCart } = useCart();
    const router = useRouter();
    const total = getTotal();

    if (items.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50 p-6">
                <View className="bg-slate-200 p-6 rounded-full mb-6">
                    <Ionicons name="cart-outline" size={64} color="#94a3b8" />
                </View>
                <Text className="text-2xl font-bold text-slate-800 mb-2">Tu carrito está vacío</Text>
                <Text className="text-slate-500 text-center mb-8">
                    ¡Explora nuestro catálogo y descubre productos increíbles!
                </Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-slate-900 px-8 py-4 rounded-xl shadow-lg"
                >
                    <Text className="text-white font-bold text-lg">Ir a comprar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-slate-50">
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View className="flex-row bg-white p-4 rounded-xl mb-3 shadow-sm border border-slate-100 items-center">
                        <Image
                            source={{ uri: item.image }}
                            className="w-16 h-16 rounded-md object-contain mr-4 bg-white"
                            resizeMode="contain"
                        />
                        <View className="flex-1">
                            <Text className="text-slate-800 font-bold text-base" numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text className="text-blue-700 font-bold mt-1">
                                ${item.price.toFixed(2)} x {item.quantity}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => removeFromCart(item.id)}
                            className="p-2 bg-red-50 rounded-full"
                        >
                            <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <View className="flex-row justify-between mb-6 items-center">
                    <Text className="text-slate-500 font-medium text-lg">Total</Text>
                    <Text className="text-3xl font-extrabold text-slate-900">
                        ${total.toFixed(2)}
                    </Text>
                </View>

                <View className="flex-row gap-4">
                    <TouchableOpacity
                        onPress={clearCart}
                        className="flex-1 bg-slate-100 py-4 rounded-xl items-center"
                    >
                        <Text className="text-slate-600 font-bold text-lg">Limpiar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-[2] bg-slate-900 py-4 rounded-xl items-center shadow-lg"
                    >
                        <Text className="text-white font-bold text-lg">Pagar Ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
