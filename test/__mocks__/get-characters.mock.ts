export const mockCharactersData = [
    {
      id: 1,
      nombre: 'Luke Skywalker',
      altura: '172',
      peso: '77',
      colorCabello: 'blond',
      colorPiel: 'fair',
      colorOjos: 'blue',
      cumpleanos: '19BBY',
      genero: 'male',
    },
  ];

export const mockResponseGetCharacters = {
    statusCode: 200,
    body: JSON.stringify({
      characters: mockCharactersData
    }),
};

export const mockResponseErrorGetCharacters = {
    statusCode: 500,
    body: JSON.stringify({
        message: "Database connection error"
    }),
};