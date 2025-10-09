# Resumen del CRUD con Node.js

Para empezar, creamos un CRUD con Node.js, organizando `index.js` para conectar el servidor y preparar los endpoints de registro. En `config.js` definimos los valores por defecto del servidor, la clave JWT y las rondas para hashear contraseñas.

Luego desarrollamos la página de registro en HTML y JS, creando el formulario, verificando los campos al enviar y enviando los datos al servidor para guardarlos en la base de datos.

En `user-repository.js` establecimos la conexión con la base de datos y definimos la clase `UserRepository`, que valida los campos, comprueba que el `username` no esté repetido, genera un ID y hashea la contraseña antes de guardar el usuario en `User.json`.

Actualmente, los usuarios se almacenan correctamente.