# Prueba Técnica - App de Productos (Expo / React Native)

Aplicación móvil desarrollada con Expo y React Native que consume la [FakeStoreAPI](https://fakestoreapi.com/) para mostrar un listado de productos y sus detalles.

## Requerimientos Cumplidos

- **Pantalla Principal (Listado):** Muestra una lista de productos obtenidos de la API en tarjetas reutilizables.
- **Pantalla de Detalle:** Muestra información detallada del producto (Imagen, Precio, Categoría, Descripción, Rating).
- **Navegación:** Uso de React Navigation (Expo Router Stack) para navegar entre pantallas.
- **API:** Fetching de datos usando `axios` desde FakeStoreAPI.
- **Búsqueda (Bonus):** Barra de búsqueda funcional para filtrar productos localmente.
- **UI/UX:** Diseño limpio y moderno utilizando **NativeWind (TailwindCSS)** e indicadores de carga.

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
