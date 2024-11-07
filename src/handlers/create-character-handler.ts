import dbConfig from '../config/dbconfig';
import { Character } from '../models/Character';
import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios'

const createCharacter: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id
    const {data} = await axios.get(`https://swapi.py4e.com/api/people/${id}`);
    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Personaje no encontrado' }),
      }
    }
    const charData: Character = {
      nombre: data.name,
      altura: data.height,
      peso: data.mass,
      colorCabello: data.hair_color,
      colorPiel: data.hair_color,
      colorOjos: data.eye_color,
      cumpleanos: data.birth_year,
      genero: data.gender,
    };
  
    const connection = await dbConfig.getConnection()

    const query = `
      INSERT INTO characters (nombre, altura, peso, colorCabello, colorPiel, colorOjos, cumpleanos, genero)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      charData.nombre,
      charData.altura,
      charData.peso,
      charData.colorCabello,
      charData.colorPiel,
      charData.colorOjos,
      charData.cumpleanos,
      charData.genero,
    ];

    await connection.execute(query, values);

    connection.release()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Character created",
        character: charData
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

export const handler = createCharacter;