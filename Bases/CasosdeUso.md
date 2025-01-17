# Casos de Uso

## Caso de uso: Registrarse
**Actor principal:** Usuario no logeado

### Flujo principal:
1. El usuario no logeado accede a la página de registro.
2. El sistema muestra un formulario con campos obligatorios: nombre, correo electrónico, contraseña y confirmación de contraseña.
3. El usuario introduce sus datos y hace clic en el botón "Registrarse".
4. El sistema valida los datos:
   - Si todos los campos son correctos, el sistema crea una nueva cuenta de usuario en la base de datos.
   - Si el correo electrónico ya está registrado, se muestra un mensaje de error.
5. El sistema envía un correo de confirmación con un enlace para activar la cuenta.
6. El usuario recibe un mensaje de confirmación y ahora puede iniciar sesión con la nueva cuenta.

### Extensiones:
- Si los datos son inválidos (por ejemplo, correo ya registrado o formato de correo incorrecto), el sistema muestra un mensaje de error junto a los campos correspondientes.
- Si el usuario no introduce todos los campos obligatorios, el sistema resalta los campos faltantes y solicita que se completen.

---

## Caso de uso: Iniciar sesión
**Actor principal:** Usuario no logeado

### Flujo principal:
1. El usuario no logeado accede a la página de inicio de sesión.
2. El sistema muestra los campos para ingresar el correo electrónico y la contraseña.
3. El usuario introduce su correo y contraseña registrados y hace clic en "Iniciar sesión".
4. El sistema valida las credenciales.
   - Si las credenciales son correctas, el usuario es autenticado y se le redirige a la página principal de su perfil.
   - Si las credenciales son incorrectas, el sistema muestra un mensaje de error.
5. El usuario logeado ahora tiene acceso a las funcionalidades de creación y gestión de entrenos.

### Extensiones:
- Si el correo electrónico o la contraseña son incorrectos, el sistema muestra un mensaje de error y solicita al usuario que lo intente nuevamente.
- Si el usuario no está registrado, el sistema ofrece un enlace para registrarse.

---

## Caso de uso: Editar perfil
**Actor principal:** Usuario logeado

### Flujo principal:
1. El usuario logeado accede a su perfil desde el menú de usuario.
2. El sistema muestra la información del perfil: nombre, correo, foto de perfil y preferencias de usuario.
3. El usuario puede editar los siguientes campos:
   - Nombre
   - Foto de perfil
   - Información personal
   - Preferencias de entrenos
4. El usuario realiza las modificaciones deseadas y hace clic en "Guardar cambios".
5. El sistema valida la información y guarda los cambios en la base de datos.
6. El usuario recibe un mensaje de confirmación que indica que los cambios se han guardado correctamente.

### Extensiones:
- Si el usuario intenta introducir datos incorrectos (como un formato inválido de correo o una imagen no permitida), el sistema muestra un mensaje de error y solicita que se corrija.
- Si el usuario no completa los campos obligatorios, el sistema muestra un mensaje de advertencia y resalta los campos faltantes.

---

## Caso de uso: Crear entrenos
**Actor principal:** Usuario logeado

### Flujo principal:
1. El usuario logeado accede a la sección de creación de entrenos desde su perfil.
2. El sistema muestra un formulario para crear un entreno:
   - Nombre del entreno
   - Tipo de entreno (fuerza, resistencia, flexibilidad, etc.)
   - Descripción del entreno
   - Duración estimada
   - Nivel (principiante, intermedio, avanzado)
3. El usuario completa el formulario con la información del entreno y hace clic en "Guardar entreno".
4. El sistema valida los datos:
   - Si todos los campos están completos, el entreno se guarda en el perfil del usuario.
   - Si falta algún campo, el sistema muestra un mensaje de error.
5. El entreno creado se añade al perfil del usuario y puede ser accedido y editado más tarde.

### Extensiones:
- Si hay campos incompletos, el sistema muestra un mensaje de advertencia junto a los campos faltantes.
- Si el usuario selecciona un nivel de dificultad no válido, el sistema muestra un mensaje de error.

---

## Caso de uso: Compartir entreno
**Actor principal:** Usuario logeado

### Flujo principal:
1. El usuario logeado accede a su perfil y selecciona un entreno previamente creado.
2. El sistema muestra los detalles del entreno seleccionado.
3. El usuario hace clic en el botón "Compartir en dashboard".
4. El sistema publica el entreno en el dashboard de la aplicación, donde otros usuarios pueden verlo y reaccionar.
5. El sistema envía una notificación al usuario indicando que el entreno ha sido compartido correctamente.

### Extensiones:
- Si el entreno no tiene una descripción completa o algún otro dato obligatorio, el sistema muestra un error indicando qué debe corregir antes de compartirlo.

---

## Caso de uso: Reaccionar a entrenos
**Actor principal:** Usuario logeado

### Flujo principal:
1. El usuario logeado accede al dashboard y visualiza entrenos compartidos por otros usuarios.
2. El sistema muestra los entrenos disponibles con sus detalles.
3. El usuario selecciona un entreno y puede reaccionar de las siguientes maneras:
   - Dar un like al entreno.
   - Dejar un comentario sobre el entreno.
4. El sistema registra la reacción del usuario y la muestra en el dashboard para que otros usuarios la vean.
5. El usuario recibe una confirmación de que su reacción fue registrada correctamente.

### Extensiones:
- Si el usuario no está logeado, el sistema le pide que inicie sesión para poder interactuar con los entrenos.

---

## Caso de uso: Ver dashboard
**Actor principal:** Usuario logeado y no logeado

### Flujo principal:
1. El usuario (logueado o no) accede al dashboard.
2. El sistema muestra los entrenos que otros usuarios han compartido en el dashboard.
3. El usuario puede ver los detalles de los entrenos, pero si no está logeado, no puede interactuar (dar like, comentar, etc.).
4. El usuario puede buscar entrenos específicos o filtrarlos por tipo o nivel.

### Extensiones:
- Si el usuario no está logeado, el sistema solo permite ver los entrenos y le pide que inicie sesión para poder reaccionar o compartir.

---

## Caso de uso: Gestionar usuarios
**Actor principal:** Administrador

### Flujo principal:
1. El administrador accede a la sección de gestión de usuarios desde el panel de administración.
2. El sistema muestra una lista de todos los usuarios registrados.
3. El administrador puede realizar las siguientes acciones:
   - Ver el perfil de un usuario.
   - Bloquear o deshabilitar una cuenta de usuario.
   - Eliminar una cuenta de usuario.
   - Modificar los permisos de un usuario.
4. El administrador selecciona la acción deseada y el sistema la ejecuta.
5. El sistema muestra un mensaje de confirmación indicando que la acción se ha realizado correctamente.

### Extensiones:
- Si el administrador intenta eliminar una cuenta activa, el sistema solicita confirmación antes de proceder.
