# Beflow test

## Descripción

Este proyecto es una aplicación backend construida con el **Framework Serverless**, **AWS Lambda** y **MongoDB** (a través de Mongoose). 
El propósito de la aplicación es gestionar productos mediante servicios como la creación, actualización, eliminación, búsqueda y obtención de productos. 
La API se expone  mediante api gateway y aws lambda, se puede probar localmente utilizando **Serverless Offline**.

La aplicación utiliza **MongoDB Atlas** como base de datos en la nube para almacenar los productos.

## Requisitos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- **Serverless Framework** 
- **MongoDB Atlas** (para la base de datos en la nube o puede ser inicializada en local)

## Instalación

Sigue estos pasos para instalar las dependencias y ejecutar la aplicación:

1. Clona el repositorio en tu máquina:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
2. Instala las dependencias
    ```bash
    npm i
  
4. inicia las apiREST
    ```bash
    npx serverless offline start

## Recomendación 

recomiendo crear un .env el cual lleve una variable llamada MONGO_URI y dentro de esta variable poner la url de tu conexión a mongoDB 

