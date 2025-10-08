# ChallengeRestaurante

Pequeña API para gestionar usuarios, restaurantes y reseñas. Los usuarios pueden registrarse, autenticarse (JWT), refrescar tokens y crear reseñas para restaurantes. Todos los datos se almacenan en MongoDB usando Mongoose.

## Características
- Registro de usuarios con password hasheada (bcrypt).
- Login con JWT (access token + refresh token). Refresh tokens guardados en el usuario en la BD.
- Endpoints protegidos con middleware JWT.
- CRUD básico para restaurantes.
- Reseñas asociadas a restaurantes (estructura básica en el proyecto).

## Requisitos
- Node.js 18+ (u otra versión compatible)
# ChallengeRestaurante

Pequeña API para gestionar usuarios, restaurantes y reseñas. Los usuarios pueden registrarse, autenticarse (JWT), refrescar tokens y crear reseñas para restaurantes. Todos los datos se almacenan en MongoDB usando Mongoose.

## Características

- Registro de usuarios con password hasheada (bcrypt).
- Login con JWT (access token + refresh token). Refresh tokens guardados en el usuario en la BD.
- Endpoints protegidos con middleware JWT.
- CRUD básico para restaurantes.
- Reseñas asociadas a restaurantes (estructura básica en el proyecto).

## Requisitos

- Node.js 18+ (u otra versión compatible)
- npm
- MongoDB (local o remoto)

## Instalación

1. Clona el repositorio

```powershell
git clone <repo-url>
cd ChallengeRestaurante
```

1. Instala dependencias

```powershell
npm install
```

1. Crea un archivo `.env` en la raíz con las variables mínimas:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/challenge_restaurante
JWT_SECRET=tu_secreto_para_access_tokens
REFRESH_TOKEN_SECRET=tu_secreto_para_refresh_tokens
```

# ChallengeRestaurante

Pequeña API para gestionar usuarios, restaurantes y reseñas. Los usuarios pueden registrarse, autenticarse (JWT), refrescar tokens y crear reseñas para restaurantes. Todos los datos se almacenan en MongoDB usando Mongoose.

## Características

- Registro de usuarios con password hasheada (bcrypt).
- Login con JWT (access token + refresh token). Refresh tokens guardados en el usuario en la BD.
- Endpoints protegidos con middleware JWT.
- CRUD básico para restaurantes.
- Reseñas asociadas a restaurantes (estructura básica en el proyecto).

## Requisitos

- Node.js 18+ (u otra versión compatible)
- npm
- MongoDB (local o remoto)

## Instalación

1. Clona el repositorio

```powershell
git clone <repo-url>
cd ChallengeRestaurante
```

2. Instala dependencias

```powershell
npm install
```

3. Crea un archivo `.env` en la raíz con las variables mínimas:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/challenge_restaurante
JWT_SECRET=tu_secreto_para_access_tokens
REFRESH_TOKEN_SECRET=tu_secreto_para_refresh_tokens
```

# ChallengeRestaurante

Pequeña API para gestionar usuarios, restaurantes y reseñas. Los usuarios pueden registrarse, autenticarse (JWT), refrescar tokens y crear reseñas para restaurantes. Todos los datos se almacenan en MongoDB usando Mongoose.

## Características

- Registro de usuarios con password hasheada (bcrypt).
- Login con JWT (access token + refresh token). Refresh tokens guardados en el usuario en la BD.
- Endpoints protegidos con middleware JWT.
- CRUD básico para restaurantes.
- Reseñas asociadas a restaurantes (estructura básica en el proyecto).

## Requisitos

- Node.js 18+ (u otra versión compatible)
- npm
- MongoDB (local o remoto)

## Instalación

1. Clona el repositorio

```powershell
git clone <repo-url>
cd ChallengeRestaurante
```

2. Instala dependencias

```powershell
npm install
```

3. Crea un archivo `.env` en la raíz con las variables mínimas:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/challenge_restaurante
JWT_SECRET=tu_secreto_para_access_tokens
REFRESH_TOKEN_SECRET=tu_secreto_para_refresh_tokens
```

4. Arranca la aplicación en modo desarrollo

```powershell
npm run dev
```

La API debería estar disponible en `http://localhost:3000`.

## Rutas principales (ejemplos)

- Registro de usuario: POST /users/register
- Login: POST /users/login
- Refresh token: POST /users/refresh
- Logout: POST /users/logout
- Listar restaurantes: GET /restaurantes
- CRUD restaurantes: rutas en `/restaurantes`

## Ejemplo rápido (PowerShell)

1. Registrar

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/users/register -Body (@{ name='User'; email='user@example.com'; password='MiPass123' } | ConvertTo-Json) -ContentType 'application/json'
```

2. Login

```powershell
$res = Invoke-RestMethod -Method POST -Uri http://localhost:3000/users/login -Body (@{ email='user@example.com'; password='MiPass123' } | ConvertTo-Json) -ContentType 'application/json'
$accessToken = $res.accessToken
$refreshToken = $res.refreshToken
```

3. Usar endpoint protegido

```powershell
Invoke-RestMethod -Method PATCH -Uri "http://localhost:3000/users/update/user@example.com" -Headers @{ Authorization = "Bearer $accessToken" } -Body (@{ name='Nuevo' } | ConvertTo-Json) -ContentType 'application/json'
```

4. Refresh

```powershell
$res2 = Invoke-RestMethod -Method POST -Uri http://localhost:3000/users/refresh -Body (@{ refreshToken = $refreshToken } | ConvertTo-Json) -ContentType 'application/json'
$accessToken = $res2.accessToken
$refreshToken = $res2.refreshToken
```

5. Logout

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/users/logout -Body (@{ refreshToken = $refreshToken } | ConvertTo-Json) -ContentType 'application/json'
```

## Notas de seguridad

- Define secretos fuertes en producción para `JWT_SECRET` y `REFRESH_TOKEN_SECRET`.
- Considera guardar refresh tokens en cookies `HttpOnly` en lugar de en el body JSON para mayor seguridad.
- Añade validaciones más estrictas y protecciones contra brute-force (rate limiting).

## Desarrollo y pruebas

- Puedes usar Postman o curl para probar los endpoints. También es recomendable agregar tests automatizados y un entorno de pruebas con una base de datos separada.

---

Si quieres, puedo generar una colección de Postman con los pasos de register/login/refresh/logout y ejemplo de creación de restaurantes. ¿La quieres?
