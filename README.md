# Readme

Contenidos:
- [descripción](#1-descripción)

- [preparación entorno](#2-preparación-del-entorno)
    - [instalación node js y npm](#21-instalación-nodejs-y-npm)
    - [api key](#22-uso-de-la-api-key)
    - [pakage.json y dotenv module](#23-módulo-dotenv-y-pakage-json)

- [prueba de la aplicación web](#3-prueba-de-la-aplicación-web)



## 1. Descripción

La aplicación consiste de un simple buscador de películas donde se muestra algo de información sobre éstas.

En cuanto a detalles más técnicos, la aplicación web utiliza la API de películas `The Movie Database` (https://www.themoviedb.org/documentation/api) y está compuesta de dos partes, la parte del servidor y la del cliente. El servidor responde las peticiones del cliente y consulta a la base de datos mencionada antes a través de su api. El cliente se encarga de solicitar datos al servidor y mostrarlos al usuario.

Las tecnologías utilizadas son:
- node js (v18.12.0) y npm (8.19.2):
    - para "levantar" el servidor y crear el entorno del mismo (dependencias, archivos, etc)
    - módulos:
        - fs: para el manejo de archivos
        - http: para las comunicaciones ente cliente y servidor y de las peticiones a la api (Request & Response)
        - dotenv: para acceder a variables de entorno (api_key)
- lenguajes: javascript, hmtl y css (con algo de Bootstrap)



## 2. Preparación del entorno

### 2.1 Instalación NodeJS y npm
Es necesario tener instalado NodeJS (http://nodejs.org/) y npm, que se instala por defecto con el anterior si se descarga desde el enlace indicado.

- Probar su correcta instalación y funcionamiento.


### 2.2 Uso de la api key
Para poder utilizar la api de `The Movie Database` es necesario una `API_KEY` y así hacer las peticiones necesarias a este servicio. Quién maneja la api y las peticiones al servicio es el servidor. Éste lo extrae de un documento `.env`, que guarda variables de entorno, mientras esta en ejecución. 

Por lo tanto será necesario que quién vaya a probar esta aplicación web introduzca en el campo `API_KEY` del documendo `.env` su clave de api obtenida desde su página web (de la api The Movie Database):
```
API_KEY="introduzca_su_api_key"
```

### 2.3 Módulo dotenv y pakage json
Para que el servidor pueda utilizar esa variable es necesario utilizar el módulo dotenv, que se encarga de acceder a archivos `.env` y manejarlos para así leer sus entradas.

Antes de instalar el módulo, hay que asegurarse de tener la estructura de carpetas y archivos de la aplicación web como se muestra a continuación:
```
-root (raíz de la ruta donde se encuentran los archivos)
  |
  -- .env
  -- .gitignore
  -- app.js
  -- package.json
  -- package-lock.json
  -> css
        |
        -- style.css
  -> js
        |
        -- script.js
  -> views
        |
        -- index.html
```
Ahora en un terminal (linux por ejemplo), donde la carpeta raíz de esos archivos, introducir el comando:
```
npm install dotenv
```
Donde se importará el módulo dotenv a la carpeta raíz. Para usar el módulo son necesarios  los documentos `package.json` y `package-lock.json`, en el que hay que volver a usar el terminal y, desde la ruta raíz donde se encuentran los archivos, introducir el comando:
```
npm init -y
```
Luego, hay que ver el contenido del archivo `package.json` añadir la siguiente información (en caso de que ya esté no hacer nada):
```
{
    "dependencies": {
    "dotenv": "^16.0.3"
    },
    "scripts": {
        "start": "node ./app.js"
    },
}
```


## 3. Prueba de la aplicación web

Para iniciar la aplicación web hay que introducir el siguiente comando, desde la ruta raíz donde se encuentran los archivos:
```
npm run-script start
```
Donde verá el siguiente mensaje, en el que el servidor se ha iniciado:
```
> moviefinderapp@1.0.0 start
> node ./app.js

Server running at http://127.0.0.1:3000/
```
Se observa la url que habrá que utilizar desde el navegador para utilizar la aplicación web: `http://127.0.0.1:3000/`. 






rsertal@inf.upv.es 2022
