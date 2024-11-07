
export const mockCharacterData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
};

export const mockResponseCreateCharacter = {
    statusCode: 200,
    body: JSON.stringify({
    message: "Character created",
    character: {
        nombre: mockCharacterData.name,
        altura: mockCharacterData.height,
        peso: mockCharacterData.mass,
        colorCabello: mockCharacterData.hair_color,
        colorPiel: mockCharacterData.skin_color,
        colorOjos: mockCharacterData.eye_color,
        cumpleanos: mockCharacterData.birth_year,
        genero: mockCharacterData.gender,
    }
    }),
};

export const mockResponseCreateCharacterError = {
    statusCode: 404,
    body: JSON.stringify({
    message: "Personaje no encontrado"
    }),
};

export const mockResponseCreateCharacterDBError = {
    statusCode: 500,
    body: JSON.stringify({
    message: "Database error"
    }),
};