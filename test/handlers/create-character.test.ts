import axios from 'axios'
import dbConfig from '../../src/config/dbconfig'
import { handler } from '../../src/handlers/create-character-handler'
import { describe } from 'node:test';
import { mockCharacterData, mockResponseCreateCharacter, mockResponseCreateCharacterDBError, mockResponseCreateCharacterError } from '../__mocks__/create-character.mock';
import { mockContext, MockEvent } from '../__mocks__/aws-events.mock';

jest.mock('axios');
jest.mock('../../src/config/dbconfig', () => ({
  getConnection: jest.fn(),
}));

describe('createCharacter Handler', () => {
  let connectionMock;

  beforeAll(() => {
    connectionMock = dbConfig.getConnection();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('Creación de personaje exitosa', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockCharacterData });

        const result = await handler(MockEvent, mockContext, () => {});

        expect(connectionMock.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO characters'),
        [
            mockCharacterData.name,
            mockCharacterData.height,
            mockCharacterData.mass,
            mockCharacterData.hair_color,
            mockCharacterData.skin_color,
            mockCharacterData.eye_color,
            mockCharacterData.birth_year,
            mockCharacterData.gender,
        ]
        );

        expect(result).toBe(mockResponseCreateCharacter)
    });

  it('Retorna un 404 por no encontrar el personaje o no apuntar un parametro existente', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: null });

    const event = Object.assign(MockEvent, {})
    event.pathParameters = { id: '999' };
    const result = await handler(event, mockContext, () => {});

    expect(result).toBe(mockResponseCreateCharacterError);
  });

  it('Retorna una error 500 de conexión con la BD', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockCharacterData });
    connectionMock.execute.mockRejectedValue(new Error('Database error'));

    const result = await handler(MockEvent, mockContext, () => {});

    expect(result).toBe(mockResponseCreateCharacterDBError);
  });
});