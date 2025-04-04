# Travel-Diary-API

## Introducción
Bienvenido a Travel-Diary-API, una aplicación de viajes que te permite registrar y compartir tus experiencias de viaje.

## Requisitos
- Node.js (versión 14 o superior)
- MySQL (versión 8 o superior)
- npm (versión 6 o superior)

## Pasos para levantar el proyecto

### 1. Instalar dependencias
Ejecuta el siguiente comando en la terminal para instalar las dependencias del proyecto:

```bash
npm i

```

### 2. Configurar varibales de entorno
Copia el archivo env.example y renómbralo a .env. Luego, configura las variables de entorno según tus necesidades.
```bash
cp .env.example .env

```

### 3. Iniciar la base de datos
Ejecuta el siguiente comando en la terminal para iniciar la base de datos:

```bash
npm run initDb

```

### 4. Levantar el servidor
Ejecuta el siguiente comando en la terminal para levantar el servidor:

```bash
npm dev

```

### 5. Probar la API
La aplicación estará disponible en http://localhost:3001. Puedes acceder a ella mediante un navegador o una herramienta de prueba de API como Postman.