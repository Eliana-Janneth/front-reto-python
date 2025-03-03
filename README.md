# 🌐 Frontend Vue Vulnerability Manager

Este proyecto es el frontend de la aplicación de gestión de vulnerabilidades de seguridad, desarrollado con **Vue 3**, **TypeScript**, **Vite**, **Tailwind CSS**, y se conecta a un backend en **Django**. Proporciona una interfaz intuitiva para visualizar, filtrar y gestionar vulnerabilidades.

## 🚀 Tecnologías Utilizadas

- **Vue 3** con **Composition API** y **TypeScript** para una arquitectura robusta y mantenible.
- **Vite** para un entorno de desarrollo ultrarrápido.
- **Tailwind CSS** para un diseño moderno y responsivo.
- **Vue Router** para la navegación entre vistas.
- **Vue3-Notification** para notificaciones en la interfaz.
- **Axios** para la comunicación con el backend Django.

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Eliana-Janneth/front-reto-python.git
cd front-reto-python
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_API_URL=http://3.147.187.32:8000/api
```

### 4️⃣ Ejecutar el Proyecto

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## 🌐 Funcionalidades

- **Inicio de Sesión**: Autenticación con JWT proporcionado por el backend.
- **Visualización de Vulnerabilidades**: Listado, detalles y filtrado de vulnerabilidades.
- **Interacción Dinámica**: Uso de componentes reutilizables y notificaciones.
- **Cambio de Estado**: Modificación del estado de vulnerabilidades (solucionadas).
- **Paginación**: Navegación eficiente en listas grandes de datos.

## 📂 Estructura del Proyecto

```bash
src
├── components     # Componentes reutilizables
├── composables    # Lógica de Vue (hooks personalizados)
├── views          # Vistas de la aplicación
├── router         # Configuración de rutas
└── api            # Peticiones API con Axios
```

## 📌 Rutas Principales

- `/login` - Página de inicio de sesión
- `/register` - Página de registro de usuario 
- `/vulnerabilities` - Visualización de vulnerabilidades
- `/vulnerabilities-fixed` - Gestión de vulnerabilidades solucionadas
- `/vulnerabilities-summary` - Información detallada de las vulnerabilidades filtradas por severidad

## 🔑 Autenticación

La aplicación utiliza un **Token JWT** para la autenticación de las rutas protegidas. El token se almacena en el **LocalStorage** y se gestiona con **Vue Router**.

## 🎨 Diseño y Animaciones

Se utilizaron animaciones suaves con **Tailwind CSS** para mejorar la experiencia del usuario, como efectos de hover en las tarjetas de vulnerabilidades y notificaciones dinámicas.

## 💡 Desarrollado por

**Eliana Puerta** 🚀

