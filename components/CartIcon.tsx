import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useRouter } from 'expo-router';

export default function CartIcon() {
    const { getItemCount } = useCart();
    const router = useRouter();
    const count = getItemCount();

    return (
        <TouchableOpacity onPress={() => router.push('/cart')} className="mr-4 relative">
            <Ionicons name="cart-outline" size={26} color="white" />
            {count > 0 && (
                <View className="absolute -top-2 -right-2 bg-blue-600 rounded-full w-5 h-5 items-center justify-center border border-slate-900">
                    <Text className="text-white text-[10px] font-bold">
                        {count > 9 ? '9+' : count}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
