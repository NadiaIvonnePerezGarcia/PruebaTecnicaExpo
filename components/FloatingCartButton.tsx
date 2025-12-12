import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function FloatingCartButton() {
    const { getItemCount, getTotal } = useCart();
    const router = useRouter();
    const count = getItemCount();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Animate when count changes
    useEffect(() => {
        if (count > 0) {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [count]);

    if (count === 0) {
        return null;
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/cart')}
                activeOpacity={0.9}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="cart" size={28} color="#ffffff" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {count > 99 ? '99+' : count}
                        </Text>
                    </View>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        right: 16,
        left: 16,
        zIndex: 1000,
    },
    button: {
        backgroundColor: '#0f172a', // slate-900
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    iconContainer: {
        position: 'relative',
        marginRight: 12,
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#3b82f6', // blue-500
        borderRadius: 12,
        minWidth: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor: '#0f172a',
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    totalContainer: {
        flex: 1,
    },
    totalLabel: {
        color: '#94a3b8', // slate-400
        fontSize: 12,
        fontWeight: '500',
    },
    totalAmount: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
