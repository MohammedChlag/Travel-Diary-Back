# Servidores Web

## Introducción

Hay 2 figuras importantes en el mundo de los servidores web que son el **cliente** y el **servidor**.

- **Cliente**: El una entidad(pc, movil, tablet, consola, ...) que solicita información o servicios. Cualquier dispositivo que se conecta a internet es un cliente. El cliente al pedir algo hace una '**request**'.

- **Servidor**: Es una entidad que proporciona información o servicios a los clientes. Un servidor es un programa que se ejecuta en un ordenador y que escucha peticiones de los clientes y les responde. El servidor al recibir una petición hace una '**response**'.

## Pasos

- El cliente hace una petición al servidor. Request
- El servidor recibe la petición y la procesa. Por procesar podemos entender que analiza la información que le llega en la petición; si un usuario se quiere loguear, en la petición va a mandar un usuario y una contraseña, el servidor tiene que comprobar que el usuario y la contraseña son correctos y cumplen con los requisitos.
- El servidor responde al cliente. Response. La respuesta tiene un encabezado y un body. El encabezado contiene información sobre la respuesta, como el código de estado (200, 404, 500, ...), la fecha, el tipo de contenido, etc. El body contiene la información que el servidor quiere enviar al cliente. Por ejemplo, si el cliente pide una página web, el body contendrá el código HTML de la página.
- El cliente recibe la respuesta, la interpreta y la muestra al usuario.
- El cliente puede hacer otra petición al servidor y el proceso se repite constantemente.

## Peticiones

Las peticiones que hace el cliente al servidor van atraves del protocolo HTTP.
HTTP es un protocolo de comunicación que se utiliza en internet para enviar y recibir información.
Las peticiones HTTP se hacen a través de la URL de la página web a la que se quiere acceder. Todo va como texto, aunque no lo veamos.

Las peticiones HTTP pueden ser de varios tipos, pero los más comunes son:

- **GET**: Se utiliza para pedir información al servidor. Por ejemplo, muestrame los productos de tal categoría.
- **POST**: Se utiliza para enviar información al servidor. Por ejemplo, enviar un formulario con los datos de registro del usuario.
- **PUT**: Se utiliza para modificar información en el servidor. Por ejemplo, actualizar la descripción de mi perfil.
- **DELETE**: Se utiliza para borrar información en el servidor. Por ejemplo, borrar un comentario.

## API RESTful

Es un estilo de arquitectura de software que se basa en el protocolo HTTP. Las API RESTful se basan en los siguientes principios:

- **Recursos**: Los recursos son las entidades que se pueden crear, leer, actualizar y borrar. Por ejemplo, un usuario, un producto, un comentario, etc.
- **Verbos HTTP**: Los verbos HTTP se utilizan para indicar la acción que se quiere realizar sobre un recurso. Los verbos más comunes son GET, POST, PUT y DELETE.
- **Endpoints**: Los endpoints son las URLs a las que se puede acceder para interactuar con los recursos. Por ejemplo, /users, /products, /comments, etc. Cada recurso tiene un endpoint asociado.

- ## NODEMON

Es una herramienta que nos permite reiniciar automáticamente el servidor cada vez que guardamos un cambio en el código. Esto es muy útil porque nos ahorra tener que reiniciar el servidor manualmente cada vez que hacemos un cambio.

Para instalar nodemon, ejecutamos el siguiente comando en la terminal:

```bash
npm install nodemon -D
```

Para poder ejecutar nodemon, tenemos que añadir un script en el package.json:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

## EXPRESS

Es un framework de Node.js que nos permite crear servidores web de forma sencilla. Express nos proporciona una serie de funciones que nos facilitan la creación de servidores web y el manejo de peticiones HTTP.

Para instalar Express, ejecutamos el siguiente comando en la terminal:

```bash
npm install express
```

Podeis ver que pone --save, pero no es necesario, era para guardarlo en el package.json, pero ya no es necesario porque se hace automáticamente.

### Crear un servidor con Express

Para crear un servidor con Express, tenemos que importar el módulo express y llamar a la función express().

```javascript
import express from 'express';

const server = express();

server.listen(3001, () => {
	console.log('Servidor escuchando en http://localhost:3001');
});
```

### Que es un middleware

Son las funciones que se ejecutan entre el momento en que el servidor recibe la petición y el momento en que responde al cliente. Su misión es procesar, modificar o verificar los datos de la solicitud o respuesta antes de que llegue al siguiente middleware o controlador.

Para que un middleware se ejecute en todas las peticiones, tenemos que añadirlo antes de las rutas.

```javascript
server.use((req, res, next) => {
	console.log('Middleware ejecutado');
	next();
});
```

### Que es un endpoint

Es una URL que el cliente puede solicitar al servidor. Por ejemplo: '/', '/users', '/products', '/login', '/register', etc.

### Que es un controlador

Es una función que se ejecuta cuando se hace una petición a un endpoint concreto. Los controladores son los encargados de procesar la petición y devolver una respuesta al cliente.

## MORGAN

Es un middleware que nos permite ver en la consola las peticiones que hace el cliente al servidor. Es muy útil para depurar y ver si las peticiones se están haciendo correctamente.

Para instalar morgan, ejecutamos el siguiente comando en la terminal:

```bash
npm install morgan -D
```

## BCRYPT

Es una librería que nos permite encriptar contraseñas. Es muy importante encriptar las contraseñas antes de guardarlas en la base de datos para proteger la información de los usuarios.

Para instalar bcrypt, ejecutamos el siguiente comando en la terminal:

```bash
npm install bcrypt
```

Para encriptar una contraseña, tenemos que hacer lo siguiente:

```javascript
import bcrypt from 'bcrypt';

const password = '123456';
const hashedPass = await bcrypt.hash(password, 10);
```

10 es el número de veces que se va a encriptar la contraseña. Cuanto mayor sea el número, más segura será la contraseña, pero también más lenta será la encriptación. Esto devuelve una promesa, por lo que hay que ponerle await. El resultado tiene siempre 60 caracteres.

Para comparar una contraseña en texto plano con una contraseña encriptada, tenemos que hacer lo siguiente:

```javascript
validPass = await bcrypt.compare(password, user.password);
```

El método compare() recibe un primer parametro con la contraseña en texto plano y un segundo parametro con la contraseña encriptada(DDBB). Devuelve true si las contraseñas coinciden y false si no coinciden.

## RANDOM STRING

Es una librería que nos permite generar cadenas de texto aleatorias. Es muy útil para generar tokens de autenticación, contraseñas temporales, etc.

Para instalar randomstring, ejecutamos el siguiente comando en la terminal:

```bash
npm install randomstring
```

Para generar una cadena de texto aleatoria, tenemos que hacer lo siguiente:

```javascript
import randomstring from 'randomstring';

const registrationCode = randomstring.generate(15);
```

El método generate() recibe un parametro con la longitud de la cadena de texto que queremos generar. En este caso, estamos generando una cadena de texto de 15 caracteres.

## JsonWebToken (JWT)

Es una librería que nos permite generar tokens de autenticación. Los tokens JWT son una forma segura de autenticar a los usuarios en una aplicación web.

Un token JWT es una cadena de texto que contiene información sobre el usuario y que se firma con una clave secreta. Tiene la siguiente estructura, **header.payload.signature**:

- **Header**: Contiene información sobre el tipo de token y el algoritmo de encriptación.
- **Payload**: Contiene la información del usuario. Nunca debemos incluir información sensible en el payload, como contraseñas o datos bancarios.
- **Signature**: Contiene la firma del token, que se genera a partir del header, el payload y la clave secreta. Es donde se verifica la validez del token.

Los tokens JWT tienen una fecha de expiración, por lo que solo son válidos durante un tiempo limitado.

Para instalar jwt, ejecutamos el siguiente comando en la terminal:

```bash
npm install jsonwebtoken
```

Para generar un token JWT, tenemos que hacer lo siguiente:

```javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign(payload, SECRET, {
	expiresIn: '1h',
});
```

## EXPRESS-FILEUPLOAD

Es un middleware que nos permite subir archivos al servidor. Es muy útil para subir imágenes, vídeos, documentos, etc.

Para instalar express-fileupload, ejecutamos el siguiente comando en la terminal:

```bash
npm install express-fileupload
```

En **POSTMAN**, al mandar un archivo, en el body, en vez de poner raw, debemos poner form-data y seleccionamos file para el atributo que va a recibir el archivo. si tenemos varios archivos, ponemos file1, file2, ...
Si en el mismo formulario queremos mandar un archivo y un texto, ponemos text o file en el que corresponda.

En el server tenemos que poner:

```javascript
import fileUpload from 'express-fileupload';

server.use(fileUpload());
```

Con esto ya podemos subir archivos al servidor.

Tengo que definir una ruta como directorio estático donde guardar los archivos subidos. Para ello, tengo que poner:

```javascript
import path from 'path';

const uploadsDir = path.join(process.cwd(), './src/uploads');
server.use('/uploads', express.static('uploads'));
```

## SHARP

Es una librería que nos permite redimensionar imágenes. Es muy útil para crear miniaturas de imágenes, cambiar el tamaño de las imágenes, etc.

Para instalar sharp, ejecutamos el siguiente comando en la terminal:

```bash
npm install sharp
```

Para redimensionar una imagen, tenemos que hacer lo siguiente:

```javascript
import sharp from 'sharp';

sharp('input.jpg')
	.resize(200, 200)
	.toFile('output.jpg', (err) => {
		if (err) {
			console.error(err);
		}
	});
```

## CRYPTO

Es un módulo del core de Node.js que nos permite crear UUIDs con el método randomUUID().
Un UUID es un identificador único universal que se utiliza para identificar de forma única a un objeto o entidad.

servidor en marcha
router
middlewares
controllers
services
models