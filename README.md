# 🚀 Proyecto NOC

> Sistema de monitoreo y logging usando Clean Architecture con TypeScript, MongoDB y PostgreSQL.

## 📋 Descripción

Este proyecto implementa un sistema NOC (Network Operations Center) con arquitectura limpia, utilizando TypeScript para el backend, MongoDB para logs rápidos y PostgreSQL para datos estructurados. Incluye envío de emails, cron jobs y datasources modulares.

## ✨ Características

- 🏗️ **Clean Architecture**: Separación clara de capas (domain, infrastructure, presentation).
- 📧 **Envío de Emails**: Integración con Nodemailer para notificaciones.
- ⏰ **Tareas Programadas**: Uso de Cron para automatizaciones.
- 🗄️ **Múltiples Bases de Datos**: MongoDB y PostgreSQL con Prisma.
- 🐳 **Dockerizado**: Fácil despliegue con contenedores.
- 🔧 **Configuración Flexible**: Variables de entorno para diferentes entornos.

## 🛠️ Requisitos

- Node.js 18+
- Docker y Docker Compose
- npm o yarn

## 📦 Instalación y Configuración

### 1. Clona el repositorio

```bash
git clone <url-del-repo>
cd 05-noc
```

### 2. Configura las variables de entorno

Copia el archivo de ejemplo y configura tus valores:

```bash
cp .env.template .env
```

Edita `.env` con tus configuraciones:

```env
PORT=3000

MAILER_SERVICE=gmail
MAILER_EMAIL=tu-email@gmail.com
MAILER_SECRET_KEY=tu-clave-app

PROD=false

MONGO_URL=mongodb://localhost:27017/
MONGO_DB_NAME=NOC
MONGO_USER=tu-usuario
MONGO_PASS=tu-password

POSTGRES_URL=postgresql://localhost:5432/NOC
POSTGRES_USER=postgres
POSTGRES_DB=NOC
POSTGRES_PASSWORD=tu-password
```

### 3. Instala dependencias

```bash
npm install
```

> ⚠️ **Nota**: `npm install` ejecuta automáticamente `prisma generate` gracias al script `postinstall`.

### 4. Levanta las bases de datos

```bash
docker compose up -d
```

## 🚀 Uso

### Desarrollo Local

Ejecuta la aplicación en modo desarrollo:

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`.

### Producción

Construye y ejecuta:

```bash
npm run build
npm start
```

## 🐳 Dockerización Completa

Para ejecutar toda la aplicación (bases de datos + app) en contenedores:

```bash
docker compose up --build
```

Esto levantará:

- 🗄️ **MongoDB** en `localhost:27017`
- 🐘 **PostgreSQL** en `localhost:5432`
- 🚀 **App Node.js** en `localhost:3000`

### Desarrollo con Hot-Reload en Docker

Para desarrollo con recarga automática, agrega esto al servicio `app` en `docker-compose.yaml`:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

## 📜 Scripts Disponibles

- `npm run dev`: Inicia en modo desarrollo con hot-reload.
- `npm run build`: Compila TypeScript a JavaScript.
- `npm start`: Ejecuta la aplicación compilada.
- `npm run generate`: Genera el cliente de Prisma.

## 📁 Estructura del Proyecto

```
src/
├── app.ts                 # Punto de entrada
├── config/                # Configuraciones (envs, plugins)
├── data/                  # Capa de datos (MongoDB, PostgreSQL)
├── domain/                # Lógica de negocio (entities, use-cases)
├── infrastructure/        # Infraestructura (datasources, database)
└── presentation/          # Presentación (server, routes)
prisma/                    # Esquemas y migraciones de Prisma
generated/                 # Cliente Prisma generado (ignorar en Git)
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
