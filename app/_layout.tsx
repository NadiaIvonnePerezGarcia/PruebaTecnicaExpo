import "../global.css";
import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a', // slate-900
          },
          headerTintColor: '#f8fafc', // slate-50
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "NovaMarket",
            headerTitleAlign: 'center',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="detail" options={{ title: "Detalle" }} />
        <Stack.Screen name="cart" options={{ title: "Mi Carrito", presentation: 'modal' }} />
      </Stack>
    </CartProvider>
  );
}
