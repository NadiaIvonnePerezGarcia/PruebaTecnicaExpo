# NovaMarket (Prueba Técnica Expo)

Aplicación móvil de e-commerce "Premium" desarrollada con Expo y React Native. Consume la [FakeStoreAPI](https://fakestoreapi.com/) y presenta una interfaz moderna y minimalista.

## Características de la Aplicación

- **Identidad "NovaMarket":** Branding visual con paleta de colores neutros (Navy/Slate) y diseño limpio.
- **Pantalla de Bienvenida:** Loading screen animada con identidad de marca.
- **Catálogo Premium:** Listado de productos con tarjetas minimalistas y sombras suaves.
- **Detalle Inmersivo:** Pantalla de detalle con imagen destacada y tipografía jerarquizada.
- **Búsqueda Instantánea:** Filtrado local optimizado.
- **Navegación Fluida:** Stack Navigator transparente y gestual.

## Instrucciones de Ejecución

Sigue estos pasos para correr el proyecto localmente:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```

3. **Abrir en tu dispositivo:**
   - Escanea el código QR con la app **Expo Go** (Android/iOS).
   - O presiona `a` para abrir en emulador Android / `i` para simulador iOS.

## Stack Tecnológico

- **Framework:** Expo (React Native)
- **Navegación:** Expo Router (Stack)
- **Estilos:** NativeWind (TailwindCSS)
- **HTTP Client:** Axios
- **Iconos:** Expo Vector Icons (Ionicons)

## Estructura del Proyecto

- `/app`: Pantallas y configuración de navegación (Expo Router).
- `/components`: Componentes reutilizables (`ProductCard`, `SearchBar`).
- `/api`: Servicios de conexión a datos.

---
Desarrollado para Prueba Técnica.
