import express from 'express';

import dbConfig from './config/dbconfig';

const app = express();

dbConfig.getConnection()
  .then(async (connection) => {
    console.log('Conectado a base de datos');
    try {
      await connection.query("CREATE DATABASE IF NOT EXISTS dbpruebas");
      await connection.query("USE dbpruebas");
      await connection.query(`
        CREATE TABLE IF NOT EXISTS characters (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          altura DECIMAL(5,2),
          peso DECIMAL(5,2),
          colorCabello VARCHAR(50),
          colorPiel VARCHAR(50),
          colorOjos VARCHAR(50),
          cumpleanos VARCHAR(50),
          genero VARCHAR(50)
        )
      `);
      console.log("Tabla 'characters' creada o ya existente.");
    } catch (error) {
      console.error("Error en la creación de la tabla:", error);
    } finally {
      connection.release();
    }
  })
  .catch((err) => {
    console.error('Error de conección a DB:', err);
  });

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
