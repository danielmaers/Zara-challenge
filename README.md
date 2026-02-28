# Zara Challenge — Catálogo de Smartphones

Aplicación web para visualización, búsqueda y gestión de un catálogo de teléfonos móviles, desarrollada como prueba técnica para Zara / Inditex.

## Requisitos previos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
API_KEY=87909682e6cd74208f41a6ef39fe4191
API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Modo desarrollo (assets sin minimizar, hot reload) |
| `npm run build` | Compilación de producción (assets concatenados y minimizados) |
| `npm run start` | Inicia el servidor de producción (requiere `build` previo) |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run format:check` | Verifica el formateo sin modificar archivos |
| `npm run test` | Ejecuta los tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con reporte de cobertura |

## Arquitectura y estructura del proyecto

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout raíz (Navbar + CartProvider)
│   ├── page.tsx                # Vista 1: Listado de teléfonos
│   ├── globals.css             # Estilos globales
│   ├── [id]/
│   │   └── page.tsx            # Vista 2: Detalle del teléfono
│   ├── cart/
│   │   └── page.tsx            # Vista 3: Carrito de compras
│   └── api/
│       └── phones/
│           ├── route.ts        # Proxy GET /api/phones?search=
│           └── [id]/
│               └── route.ts    # Proxy GET /api/phones/:id
├── components/
│   ├── Navbar/                 # Barra de navegación con icono de carrito
│   ├── PhoneCard/              # Tarjeta de teléfono para el listado
│   ├── SearchBar/              # Buscador con debounce y contador de resultados
│   ├── ColorSelector/          # Selector de color con swatches
│   ├── StorageSelector/        # Selector de almacenamiento
│   ├── SimilarPhones/          # Grid de productos similares
│   └── CartItem/               # Ítem individual del carrito
├── context/
│   └── CartContext.tsx         # Estado global del carrito (Context API + localStorage)
├── services/
│   └── api.ts                  # Capa de acceso a datos
├── styles/
│   └── variables.css           # CSS Custom Properties (design tokens)
├── types/
│   └── index.ts                # Tipos TypeScript
└── __tests__/                  # Tests unitarios, integración y servicio
    ├── api.test.ts
    ├── CartContext.test.tsx
    ├── CartItem.test.tsx
    ├── CartPage.test.tsx
    ├── ColorSelector.test.tsx
    ├── HomePage.test.tsx
    ├── Navbar.test.tsx
    ├── PhoneCard.test.tsx
    ├── PhoneDetailPage.test.tsx
    ├── SearchBar.test.tsx
    ├── SimilarPhones.test.tsx
    └── StorageSelector.test.tsx
```

### Decisiones de arquitectura

**Next.js 14 con App Router**
Elegido para cubrir el requisito opcional de SSR. Las rutas de API (`/api/phones`) actúan como proxy hacia la API externa, manteniendo la `x-api-key` en el servidor sin exponerla al cliente.

**Gestión del estado del carrito**
Se usa React Context API con persistencia en `localStorage`. El carrito sobrevive a recargas de página. El contexto se inicializa leyendo `localStorage` en el primer render.

**CSS Modules + CSS Custom Properties**
Cada componente tiene su propio archivo `.module.css` para el scoping de estilos. Las variables de diseño se definen en `src/styles/variables.css` y se importan globalmente, cubriendo el requisito opcional de variables CSS.

**Proxy de API**
Los componentes cliente no acceden directamente a la API externa. En su lugar, llaman a rutas internas de Next.js (`/api/phones`) que proxean la petición con la API key. Esto evita exponer credenciales en el bundle del cliente.

**Buscador con debounce**
El `SearchBar` implementa un debounce de 300ms para evitar llamadas a la API en cada tecla. El filtrado se realiza en la API (no en cliente), tal como indica el enunciado.

**Normalización de datos de la API**
El proxy `/api/phones` deduplica los resultados por `id` antes de devolverlos (la API externa puede retornar entradas duplicadas) y limita el listado principal a 20 teléfonos según el enunciado. Los hexcodes de color que devuelve la API no coinciden con los del diseño Figma (por ejemplo, la API devuelve `#FFFF00` para "Titanium Yellow" en lugar del tono del diseño); se usan los valores de la API tal como llegan, dado que son datos externos no controlables.

## Stack tecnológico

- **Framework**: Next.js 14 (React 18)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules + CSS Custom Properties
- **Estado**: React Context API
- **Testing**: Jest + Testing Library
- **Linting**: ESLint (next/core-web-vitals + next/typescript)
- **Formateo**: Prettier
- **Fuente**: Helvetica, Arial, sans-serif

## Vistas implementadas

1. **Listado** (`/`) — Grid responsive de teléfonos con buscador en tiempo real
2. **Detalle** (`/[id]`) — Imagen dinámica por color, selectores de storage y color, especificaciones técnicas, productos similares
3. **Carrito** (`/cart`) — Lista de productos añadidos, precio total, eliminar por ítem
