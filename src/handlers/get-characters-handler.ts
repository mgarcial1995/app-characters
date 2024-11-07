import dbConfig from '../config/dbconfig';
import axios from 'axios';
import { get } from 'http';
import { Character } from '../models/Character';

import { APIGatewayProxyHandler } from 'aws-lambda';

const getCharacters: APIGatewayProxyHandler  = async (event) => {
  try {
    const connection = await dbConfig.getConnection()

    const query = `SELECT * FROM characters`;
    const [rows]: any = await connection.query(query);

    connection.release();

    return {
      statusCode: 200,
      body: JSON.stringify({
        characters: rows
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Database connection error" }),
    };
  }
};

export const handler = getCharacters;