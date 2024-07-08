# Arriendo de Canchas USM

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando hagas cambios.\
También puedes ver cualquier error de lint en la consola.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Agrupa correctamente React en modo de producción y optimiza la construcción para el mejor rendimiento.

La construcción está minificada y los nombres de los archivos incluyen los hashes.\
¡Tu aplicación está lista para ser desplegada!


## Base de Datos

Se requiere modificar y correr un par de archivos para que la base de datos de la aplicación funcione correctamente.

Ingresara la carpeta 'backend' y modificar el archivo 'index.js' con las credenciales correspondientes de la base de datos de postgre propias y luego al directorio 'crear-tabla' y modficar todos los archivos nuevamente con las credenciales correctas. 

Luego ejecutar:

### `node index.js`
### `node crearTabla.js`
### `node createHorariosTable.js`
### `node crearHorarios.js`


