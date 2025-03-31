# INTEGRANTES
- Andersson David Sánchez Méndez
- Cristian Santiago Pedraza Rodríguez
- Ricardo Andres Ayala Garzon
- Santiago Botero García

# ELYSIUM

## PRE-RREQUISITOS
- Node.js
- JSDocs
- MongoDB
- AzureDevops

## OBJETIVOS
1. Planeación de un proyecto de software.
2. Entender arquitectura cliente servidor.
3. Inyección de dependencias - Inversión de control.
4. Manejo de bases de datos no relacionales.
6. Definición de API Rest Con SpringBoot.
7. Realizar Análisis estático para garantizar calidad del código y detección de deuda técnica.
8. Integrar pruebas unitarias en el desarrollo del producto.


## CASO DE NEGOCIO - SISTEMA DE RESERVAS DE LABORATORIOS PARA LA DECANATURA DE INGENIERÍA DE SISTEMAS.

El proyecto consiste en una aplicación para la gestión de reservas de laboratorios dentro Ingeniería de Sistemas de la Escuela Colombiana de Ingeniería Julio Garavito. Los usuarios podrán consultar la disponibilidad de laboratorios, realizar reservas y cancelar sus reservas desde una interfaz web. La aplicación se conectará a un API REST desarrollado en Spring Boot. El backend permitirá la inyección de dependencias para el manejo de datos, pudiendo optar entre una base de datos en MongoDB Cloud o un archivo de texto plano para almacenar las reservas.

## REQUERIMIENTOS
- El usuario debe poder consultar la disponibilidad de laboratorios.
- El usuario debe poder reservar un laboratorio especificando fecha, hora y propósito.
- El usuario debe poder cancelar sus reservas.
- La aplicación debe validar que un laboratorio no se pueda reservar si ya está ocupado.


# CREACIÓN DEL PROYECTO REACT
Para crear un proyecto en React, sigue estos pasos:

## Instalar Node.js
Primero, necesitas tener Node.js instalado en tu máquina. Si no lo tienes, descárgalo desde su sitio oficial Node.js.

## Crear un nuevo proyecto con Create React App
Una vez tengas Node.js instalado, abre una terminal y ejecuta los siguientes comandos para crear tu proyecto React:
```sh
npm install -g create-react-app
npx create-react-app my-app
```
Esto creará una nueva aplicación React llamada "my-app". Puedes reemplazar "my-app" por el nombre de tu elección.

![alt text](<images/Screenshot 2025-03-17 203721.png>)

## LIBRERÍAS UTILIZADAS
Durante el desarrollo del proyecto, se utilizaron las siguientes librerías:
```sh
npm install react-router-dom
npm install axios
npm install d3
npm install jwt-decode
```

## MANTENIMIENTO Y CONSTRUCCIÓN
### Reparar vulnerabilidades y limpiar caché
Ejecutar los siguientes comandos según sea necesario:
```sh
npm audit fix
npm cache clean --force
```

### Generar una versión para producción
Contruir el proyecto con el siguiente comando:
```sh
npm run build
```
### Autorizar el puerto predeterminado de Node.js
Es importante asegurarse de que el puerto http://localhost:3000 está autorizado en la configuración de Cors de MongoDB, ya que este es el puerto por defecto que utiliza Node.js para ejecutar las aplicaciones React.

### Iniciar la aplicación
Para iniciar la aplicación en el entorno de desarrollo, se usa:
```sh
npm start
```