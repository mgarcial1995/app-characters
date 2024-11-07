import { handler } from '../../src/handlers/get-characters-handler';
import dbConfig from '../../src/config/dbconfig';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { mockCharactersData, mockResponseErrorGetCharacters, mockResponseGetCharacters } from '../__mocks__/get-characters.mock';

jest.mock('../../src/config/dbconfig');

describe('getCharacters Handler', () => {
  it('should return a list of characters', async () => {
    // Configuramos el mock para la conexión y consulta
    const mockConnection = {
      query: jest.fn().mockResolvedValue([mockCharactersData]),
      release: jest.fn(),
    };
    (dbConfig.getConnection as jest.Mock).mockResolvedValue(mockConnection);

    const mockEvent = {} as APIGatewayProxyEvent;
    const mockContext = {} as Context;

    const result = await handler(mockEvent, mockContext, () => {});

    expect(result).toStrictEqual(mockResponseGetCharacters);
    expect(mockConnection.query).toHaveBeenCalledWith('SELECT * FROM characters');
    expect(mockConnection.release).toHaveBeenCalled();
  });

  it('should return a 500 status code if an error occurs', async () => {
    (dbConfig.getConnection as jest.Mock).mockRejectedValue(new Error('Database connection error'));

    const mockEvent = {} as APIGatewayProxyEvent;
    const mockContext = {} as Context;

    const result = await handler(mockEvent, mockContext, () => {});

    expect(result).toStrictEqual(mockResponseErrorGetCharacters)
  });
});
