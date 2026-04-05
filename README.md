# Proyecto NOC

El objetivo es crear una serie de tareas usando Clean Architecture con TypeScript

# dev

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_SERVICE
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
```

3. Ejecutar el comando `npm install`

4. Levantar las bases de datos con el comando

   ```
   docker compose up -d
   ```

5. Ejecutar `npm run dev`

> Nota: `npm install` ejecuta automáticamente `prisma generate` gracias al script `postinstall`, por lo que no es necesario ejecutarlo manualmente después de clonar el proyecto.
