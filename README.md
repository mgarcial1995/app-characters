# Proyecto de Prueba tecnica

Este proyecto implementa un sistema de creacion y almacen de personajes utilizando AWS Lambda, API Gateway y una base de datos MySQL. Incluye dos endpoints, uno para crear un personaje y otro para obtener la lista de personajes.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
  - [POST /api/character/{id}](#post-apicharacterid)
  - [GET /api/characters](#get-apicharacters)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Pruebas](#pruebas)

## Descripción

Este proyecto es una API REST que permite gestionar personajes, obtenidos de la API de Star Wars. La API proporciona dos servicios principales: 
1. Crear un nuevo personaje en la base de datos.
2. Obtener una lista de todos los personajes almacenados.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el código backend.
- **TypeScript**: Lenguaje utilizado para el desarrollo.
- **AWS Lambda**: Computación sin servidor para los endpoints.
- **API Gateway**: Gestión y exposición de los endpoints.
- **MySQL**: Base de datos para almacenar los personajes.
- **Serverless Framework**: Despliegue y gestión de infraestructura en AWS.
- **Jest**: Framework de pruebas unitarias.

## Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/mgarcial1995/app-characters.git
   cd app-characters
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**: Crear un archivo .env y agregar las siguientes variables
   ```bash
    DB_HOST=<tu_host_de_base_de_datos>
    DB_USER=<tu_usuario_de_base_de_datos>
    DB_PASSWORD=<tu_contraseña_de_base_de_datos>
    DB_NAME=<nombre_de_la_base_de_datos>
    ```
4. **Arrancar el proyecto**: Para que se creen las bases de datos y la tabla, arrancar el proyecto
   ```bash
    npm start
    ```
5. **Despliegue en AWS**:
   ```bash
    npx serverless deploy
    ```
## Estructura del proyecto

    ├── src
    │   ├── config
    │   │   └── dbconfig.ts        # Configuración de la conexión a MySQL
    │   ├── handlers
    │   │   ├── create-character-handler.ts  # Lambda para crear personaje
    │   │   └── get-characters-handler.ts    # Lambda para obtener personajes
    │   ├── models
    │   │   └── Character.ts        # Definición del modelo de datos Character
    │   └── tests
    │       └── handlers            # Pruebas unitarias de los handlers
    └── serverless.yml              # Configuración de Serverless Framework

## Endpoints
###  POST /api/character/{id}
Crea un personaje en la base de datos usando un ID que corresponde al personaje en la API de Star Wars.

```http
POST /dev/api/character/1
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | Id por el cual se buscara el personaje y se guardara en la DB |

#### Respuesta de exito

```bash
{
  "message": "Character created",
  "character": {
    "nombre": "Luke Skywalker",
    "altura": "172",
    "peso": "77",
    "colorCabello": "blond",
    "colorPiel": "fair",
    "colorOjos": "blue",
    "cumpleanos": "19BBY",
    "genero": "male"
  }
}
```

### GET /api/characters
Obtiene una lista de todos los personajes en la base de datos.

```http
GET /api/characters
```
#### Respuesta de éxito:
```bash
{
  "charactersData": [
    {
      "nombre": "Luke Skywalker",
      "altura": "172",
      "peso": "77",
      "colorCabello": "blond",
      "colorPiel": "fair",
      "colorOjos": "blue",
      "cumpleanos": "19BBY",
      "genero": "male"
    },
    ...
  ]
}
```

## Configuración de la Base de Datos
Al conectarse a la base de datos, el sistema verifica que existan tanto la base de datos como la tabla necesarias. Si no existen, las crea automáticamente.

```bash
CREATE TABLE characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  altura VARCHAR(10),
  peso VARCHAR(10),
  colorCabello VARCHAR(50),
  colorPiel VARCHAR(50),
  colorOjos VARCHAR(50),
  cumpleanos VARCHAR(50),
  genero VARCHAR(50)
);
```

## Pruebas
Ejecución de pruebas 

```bash
npm run test