import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function LoadingScreen() {
    return (
        <Animated.View
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(500)}
            className="flex-1 items-center justify-center bg-slate-50"
        >
            <View className="items-center mb-10">
                <View className="bg-slate-900 p-6 rounded-3xl shadow-2xl mb-6">
                    <Ionicons name="bag-handle-outline" size={64} color="white" />
                </View>
                <Text className="text-4xl font-extrabold text-slate-800 tracking-tighter">
                    Nova<Text className="text-blue-700">Market</Text>
                </Text>
                <Text className="text-slate-400 text-sm mt-2 tracking-widest uppercase font-semibold">
                    Premium Shopping
                </Text>
            </View>

            <ActivityIndicator size="large" color="#1e3a8a" />
        </Animated.View>
    );
}
