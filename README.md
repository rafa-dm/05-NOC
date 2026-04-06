# Proyecto NOC

Sistema de monitorización de servicios construido con Clean Architecture y TypeScript.

---

## Requisitos previos

- Node.js
- Docker

---

## Configuración de desarrollo

### 1. Variables de entorno

Copia el template y rellena los valores:

```bash
cp .env.template .env
```

```env
PORT=3000

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

MONGO_URL=mongodb://<user>:<pass>@localhost:27017/
MONGO_DB_NAME=NOC
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=postgresql://<user>:<pass>@localhost:5432/<db>
POSTGRES_USER=
POSTGRES_DB=NOC
POSTGRES_PASSWORD=
```

### 2. Instalar dependencias

```bash
npm install
```

> Ejecuta automáticamente `prisma generate` via `postinstall`.

### 3. Levantar bases de datos y migrar

```bash
npm run setup
```

> Arranca los contenedores Docker y ejecuta las migraciones de Prisma en un solo paso.

### 4. Arrancar en modo desarrollo

```bash
npm run dev
```

---

## Configuración de tests

### 1. Variables de entorno de test

Copia el template y rellena los valores:

```bash
cp .env.test.template .env.test
```

> Los contenedores de test usan puertos distintos para poder coexistir con los de desarrollo:
> - MongoDB: `27018`
> - PostgreSQL: `5433`

### 2. Ejecutar tests

```bash
npm run test:watch   # modo watch (levanta contenedores automáticamente)
npm test             # ejecución única
npm run test:coverage  # con informe de cobertura
```

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor en modo desarrollo con hot-reload |
| `npm run build` | Compila el proyecto a `dist/` |
| `npm start` | Compila y ejecuta en producción |
| `npm run setup` | Levanta Docker (dev) y ejecuta migraciones |
| `npm run generate` | Genera el cliente de Prisma |
| `npm run migrate` | Ejecuta las migraciones de Prisma |
| `npm test` | Ejecuta los tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con cobertura |
