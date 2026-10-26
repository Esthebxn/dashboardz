# 🎬 ZoomTV CMS - Panel de Control

Un sistema de gestión de contenido (CMS) moderno con diseño glassmorphism para administrar el sitio web de ZoomTV.

## ✨ Características

- 🎨 **Diseño Glassmorphism** - Interfaz moderna con efectos de vidrio
- 📱 **Responsive** - Funciona perfectamente en móviles y desktop
- ⚡ **Rápido** - Construido con Vite y React
- 🔄 **Tiempo Real** - Actualizaciones instantáneas
- 🎯 **Intuitivo** - Interfaz fácil de usar

## 🚀 Tecnologías

- **React 18** - Framework principal
- **Vite** - Herramienta de construcción
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Axios** - Cliente HTTP
- **CSS3** - Estilos glassmorphism personalizados

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 🎯 Funcionalidades

### 📰 Gestión de Noticias
- Ver todas las noticias
- Filtrar por categoría (Actualidad, Deportes, Música, etc.)
- Buscar noticias
- Crear, editar y eliminar noticias
- Marcar como destacadas
- Control de estado (activo/inactivo)

### 📅 Gestión de Programación
- Vista semanal de programación
- Navegación por días
- Crear, editar y eliminar programas
- Organización por horarios
- Categorización de programas

### 👥 Gestión de Anunciantes
- Lista de anunciantes
- Información de contacto
- Categorización
- Control de estado

### 🏢 Gestión de Nosotros
- Información de la empresa
- Misión y visión
- Datos de contacto
- Equipo de trabajo

## 🎨 Diseño Glassmorphism

El CMS utiliza un diseño glassmorphism que incluye:

- **Efectos de vidrio** con `backdrop-filter: blur()`
- **Transparencias** con `rgba()` y opacidades
- **Bordes sutiles** con colores semi-transparentes
- **Sombras suaves** para profundidad
- **Animaciones fluidas** con Framer Motion

## 🔧 Configuración de API

El CMS se conecta a la API de Node.js en `http://localhost:3000/api`. Asegúrate de que:

1. El servidor de la API esté ejecutándose
2. La base de datos MySQL esté configurada
3. Los datos estén insertados en las tablas

## 📁 Estructura del Proyecto

```
mysql_cms/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Componente principal
│   │   ├── NoticiasManager.jsx    # Gestión de noticias
│   │   └── ProgramacionManager.jsx # Gestión de programación
│   ├── services/
│   │   └── api.js                 # Servicio de API
│   ├── App.jsx                    # Componente raíz
│   ├── index.css                  # Estilos glassmorphism
│   └── main.jsx                   # Punto de entrada
├── package.json
└── README.md
```

## 🎯 Próximas Funcionalidades

- [ ] Formularios completos de CRUD
- [ ] Subida de imágenes
- [ ] Editor de texto enriquecido
- [ ] Gestión de usuarios
- [ ] Dashboard con estadísticas
- [ ] Exportación de datos
- [ ] Sistema de notificaciones

## 🚀 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la construcción
- `npm run lint` - Linter de código

## 📱 Responsive Design

El CMS está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🎨 Personalización

Los estilos glassmorphism se pueden personalizar en `src/index.css`:

- Colores de fondo
- Intensidad del blur
- Opacidades
- Bordes y sombras
- Animaciones

## 🔒 Seguridad

- Validación de datos en el frontend
- Sanitización de inputs
- Manejo seguro de errores
- Conexión segura con la API

---
<img width="1559" height="649" alt="image" src="https://github.com/user-attachments/assets/92a22798-7bc3-4008-932f-c6514c15fa42" />
<img width="1544" height="720" alt="image" src="https://github.com/user-attachments/assets/85cb31fe-4521-4e1a-b1a6-3bd6421899e2" />
<img width="1567" height="715" alt="image" src="https://github.com/user-attachments/assets/1b51c806-6589-481e-b70d-f16da1958bd2" />
<img width="1557" height="671" alt="image" src="https://github.com/user-attachments/assets/c02e5b0b-a1f4-48e3-85bb-43ad26fb6b42" />
<img width="1586" height="494" alt="image" src="https://github.com/user-attachments/assets/a64c6ad7-3464-494d-b596-e6772eb24e1b" />


**Desarrollado con ❤️ para ZoomTV**
