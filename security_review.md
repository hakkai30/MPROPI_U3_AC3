# Auditoría de Seguridad del Workspace

Tras revisar el código de tu aplicación (Frontend, Backend y código compartido), he identificado varios problemas de seguridad que deberías abordar antes de considerar esta aplicación lista para un entorno de producción.

## 🚨 Vulnerabilidades Críticas

### 1. Credenciales Hardcodeadas y Contraseñas en Texto Plano
- **Ubicación:** `backend/server.js` (Línea 16)
- **Problema:** La validación se hace comparando directamente con valores fijos: `email === 'test@test.com' && password === '12345678'`. 
  - Nunca se deben incluir credenciales en el código fuente.
  - Las contraseñas nunca deben guardarse ni compararse en texto plano.
- **Remediación:** Utilizar una base de datos. Las contraseñas deben ser hasheadas usando algoritmos criptográficos robustos (como `bcrypt` o `argon2`) y un "salt" único por usuario. La comparación debe hacerse comparando los hashes.

## 🔴 Vulnerabilidades Altas

### 2. Transmisión de Datos Insegura (HTTP)
- **Ubicación:** `frontend/app.js` (Línea 5) y configuración del servidor.
- **Problema:** Las peticiones se hacen a `http://localhost:3000`. Al usar HTTP en lugar de HTTPS, las credenciales viajan en texto plano por la red y pueden ser interceptadas mediante ataques de "Man-in-the-Middle" (MitM).
- **Remediación:** Configurar un certificado SSL/TLS en el servidor para producción de manera que todo el tráfico viaje encriptado sobre HTTPS.

### 3. Falta de Protección contra Fuerza Bruta (Rate Limiting)
- **Ubicación:** `backend/server.js`
- **Problema:** El endpoint `/login` no tiene límite de peticiones. Un atacante podría usar un script para enviar miles de combinaciones de contraseñas por segundo hasta adivinar una válida.
- **Remediación:** Implementar un middleware de limitación de tasa (rate-limiting) como `express-rate-limit` para bloquear IPs que hagan demasiados intentos fallidos en un corto periodo de tiempo.

## 🟡 Vulnerabilidades Medias

### 4. Validación de Entrada Deficiente e Inconsistente
- **Ubicación:** `backend/server.js`, `shared/validation.js`, `frontend/app.js`
- **Problema:** 
  - El backend toma `{ email, password }` directamente de `req.body` sin verificar que sean cadenas de texto (strings) ni limitar su longitud (lo que podría llevar a ataques de denegación de servicio por payloads gigantes).
  - La función `validateLogin` en `shared` es muy débil: solo comprueba que los valores existan (`!email || !password`), pero no verifica que el email tenga un formato válido ni que la contraseña tenga una longitud mínima/máxima.
  - El frontend **no llama** a `validateLogin` antes de enviar la petición.
- **Remediación:** 
  - Integrar la función `validateLogin` en `app.js` antes de hacer el `fetch`.
  - Mejorar la validación utilizando expresiones regulares para el email y límites de longitud para la contraseña.
  - Re-validar los datos estrictamente en el backend (ej. usando librerías como `zod` o `joi`).

### 5. Inexistencia de Gestión de Sesiones (Autenticación)
- **Ubicación:** `backend/server.js`
- **Problema:** Tras un login exitoso, el servidor simplemente devuelve un mensaje `{"message": "Login correcto"}`. No se emite ninguna prueba criptográfica de identidad (como un JWT) ni se establece una cookie de sesión.
- **Remediación:** Tras validar las credenciales, el servidor debe generar un JSON Web Token (JWT) o una Cookie de sesión `HttpOnly` y `Secure` para que el frontend pueda autenticarse en peticiones futuras.

## 🔵 Mejoras de Buenas Prácticas (Bajas)

### 6. Ausencia de Cabeceras de Seguridad (Security Headers)
- **Ubicación:** `backend/server.js`
- **Problema:** Express por defecto envía cabeceras como `X-Powered-By: Express` que revelan tecnología del backend y omite cabeceras de seguridad modernas (HSTS, X-Content-Type-Options, etc).
- **Remediación:** Instalar y utilizar el middleware `helmet` (`app.use(helmet())`).
