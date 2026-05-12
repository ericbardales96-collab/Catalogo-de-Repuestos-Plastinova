# Catálogo Digital de Repuestos - Plastinova

## 📱 Aplicación Móvil React Native

Aplicación móvil completa para gestionar un catálogo digital de repuestos con búsqueda, filtros y panel administrativo.

### ✨ Características

- ✅ **Sistema de Autenticación**
  - 4 usuarios administrativos configurados
  - Acceso para clientes sin contraseña
  - Roles diferenciados (admin vs cliente)

- ✅ **Catálogo Completo**
  - Listar 3000+ repuestos
  - Búsqueda por código, nombre, descripción
  - Filtros dinámicos por rubro y categoría
  - Vista detallada de cada repuesto

- ✅ **Panel Administrativo** (solo admins)
  - Agregar nuevos repuestos
  - Editar repuestos existentes
  - Eliminar productos
  - Gestión de inventario

- ✅ **Perfil de Usuario**
  - Ver información de cuenta
  - Mostrar rol (admin o cliente)
  - Cerrar sesión

### 📊 Estructura de Datos

Base de datos SQLite con tabla de repuestos:

```
Código | Descripción IOSA | Presentación | Tipo de Compra | 
Max | Min | # Rack | Nivel | Módulo | Categoría | 
Cód_RUBRO | Descripción del Rubro | Descripción del futuro | Bodega | 
Consumo 2022 | Consumo 2023 | Consumo 2024 | Consumo 2025
```

### 🔑 Usuarios de Prueba

**Administradores:**
- Usuario: `CarlosGallardo` | Contraseña: `Carlos123`
- Usuario: `KevinHernandez` | Contraseña: `Kevin123`
- Usuario: `EliMendoza` | Contraseña: `Eli123`
- Usuario: `EricBardales` | Contraseña: `Eric123`

**Cliente:**
- Solo ingresa tu nombre (sin contraseña)

### 🚀 Instalación y Uso

#### Requisitos previos:
- Node.js 14+
- npm o yarn
- Expo CLI (opcional)

#### Pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ericbardales96-collab/Catalogo-de-Repuestos-Plastinova.git
   cd Catalogo-de-Repuestos-Plastinova
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

4. **Opciones de visualización:**
   - `w` - Abrir en navegador web
   - `a` - Abrir en emulador Android
   - `i` - Abrir en simulador iOS
   - Escanear código QR con Expo Go (móvil físico)

### 📁 Estructura del Proyecto

```
.
├── App.js                          # Archivo principal
├── package.json                    # Dependencias
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # Pantalla de login
│   │   ├── CatalogScreen.js        # Catálogo y búsqueda
│   │   ├── AdminScreen.js          # Panel administrativo
│   │   └── ProfileScreen.js        # Perfil de usuario
│   ├── database/
│   │   └── db.js                   # Inicialización y operaciones BD
│   └── components/
│       ├── SearchBar.js            # Barra de búsqueda
│       └── FilterBar.js            # Filtros
├── assets/                         # Imágenes y recursos
└── README.md                       # Este archivo
```

### 🛠️ Tecnologías Utilizadas

- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma de desarrollo para React Native
- **React Navigation** - Navegación entre pantallas
- **SQLite** - Base de datos local
- **JavaScript ES6+** - Lenguaje de programación

### 📝 Notas Importantes

- Los datos de repuestos se almacenan localmente en SQLite
- El sistema está diseñado para 3000+ repuestos
- Las imágenes de repuestos se pueden almacenar como URLs
- Los usuarios admin tienen acceso completo a la gestión
- Los clientes solo pueden ver y buscar repuestos

### 🐛 Troubleshooting

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Android emulator not found"**
- Instala Android Studio
- Configura un emulador virtual
- O usa Expo Go en tu celular

**Error de base de datos**
- Elimina la carpeta `.expo`
- Ejecuta `npm install` de nuevo

### 📧 Contacto

- Desarrollador: ericbardales96@gmail.com
- Repositorio: https://github.com/ericbardales96-collab/Catalogo-de-Repuestos-Plastinova

---

**Última actualización:** 12 de Mayo de 2026