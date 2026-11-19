# Backend de autenticación

API REST con Node.js, TypeScript y Express. Permite registrar usuarios, iniciar sesión y consultar el perfil autenticado. Los datos se guardan en `data/db.json`; el archivo y la carpeta se crean automáticamente al arrancar. Las contraseñas se almacenan con scrypt y la autenticación usa JWT Bearer de una hora.

## Puesta en marcha

Requiere Node.js 22.18 o superior. Desde esta carpeta:

```powershell
npm install
Copy-Item .env.example .env
```

En `.env`, configura `JWT_SECRET` con un valor aleatorio de al menos 32 caracteres. Puedes generarlo con:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Arranca el servidor:

```powershell
npm run dev
```

Para compilar y ejecutar la versión compilada:

```powershell
npm run build
npm start
```

`DATA_FILE` permite cambiar la ruta del JSON; por defecto es `data/db.json`, relativa a esta carpeta. El archivo de datos se excluye de Git para evitar publicar información de usuarios.

## Endpoints

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| GET | `/` | Público | Estado de la API y lista de endpoints. |
| GET | `/api/health` | Público | Comprueba que la API está activa. |
| POST | `/api/auth/register` | Público | Registra una cuenta y devuelve un JWT. |
| POST | `/api/auth/login` | Público | Inicia sesión y devuelve un JWT. |
| GET | `/api/auth/me` | Bearer | Devuelve el perfil de la cuenta autenticada. |

Ejemplo de registro:

```json
{
  "name": "Ana",
  "email": "ana@example.com",
  "password": "una-clave-segura"
}
```

Para `/api/auth/me`, envía `Authorization: Bearer <token>`. No se guarda estado de sesión en el servidor: para cerrar sesión, el cliente debe descartar el token.
