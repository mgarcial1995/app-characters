import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "aws-lambda";

export const mockContext: Context = {
    functionName: 'test-function',
    functionVersion: '1',
    invokedFunctionArn: 'arn:aws:lambda:us-west-2:123456789012:function:test-function',
    memoryLimitInMB: '128',
    awsRequestId: 'test-request-id',
    logGroupName: '/aws/lambda/test-function',
    logStreamName: 'test-log-stream',
    getRemainingTimeInMillis: () => 3000,
    callbackWaitsForEmptyEventLoop: true,
    done: jest.fn(),
    fail: jest.fn(),
    succeed: jest.fn(),
};

export const MockEvent = {
    pathParameters: { id: '1' },
    body: JSON.stringify({}),
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'GET',
    queryStringParameters: {},
    path: '/character/{id}',
    stageVariables: {},
    requestContext: {
        accountId: '123456789012',
        apiId: 'test-api-id',
        authorizer: {},
        httpMethod: 'GET',
        identity: { sourceIp: '192.168.1.1', userAgent: 'Mozilla/5.0' },
        path: '/character/{id}',
        stage: 'dev',
        requestId: 'test-request-id',
        resourceId: 'test-resource-id',
        resourcePath: '/character/{id}',
    },
    isBase64Encoded: false,
} as unknown as APIGatewayProxyEvent;