import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  return (
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
          headerLeft: () => null, // Remove back button space if any
        }}
      />
      <Stack.Screen name="detail" options={{ title: "Detalle" }} />
    </Stack>
  );
}
