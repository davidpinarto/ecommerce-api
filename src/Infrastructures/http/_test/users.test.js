const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/users endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /users', () => {
    it('should response 201 and persist user', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.registeredUser).toBeDefined();
    });

    it('should response 400 when request payload did not contain needed property', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because payload did not contain needed property');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
        fullname: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because payload did not meet data type specification');
    });

    it('should response 400 when username character length is greater than 50', async () => {
      const requestPayload = {
        username: 'daviddaviddaviddaviddaviddaviddaviddaviddaviddaviddavid',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because username reach max limit character');
    });

    it('should response 400 when username contain restricted character', async () => {
      const requestPayload = {
        username: 'david pinarto',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because username contain restricted character');
    });

    it('should handle server error correctly', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer({});

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(500);
      expect(responseJson.status).toEqual('error');
      expect(responseJson.message).toEqual('sorry, there was a failure on our server');
    });
  });

  describe('when POST /authentications', () => {
    it('should response 201 and persist user', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.registeredUser).toBeDefined();
    });

    it('should response 400 when request payload did not contain needed property', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because payload did not contain needed property');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
        fullname: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because payload did not meet data type specification');
    });

    it('should response 400 when username character length is greater than 50', async () => {
      const requestPayload = {
        username: 'daviddaviddaviddaviddaviddaviddaviddaviddaviddaviddavid',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because username reach max limit character');
    });

    it('should response 400 when username contain restricted character', async () => {
      const requestPayload = {
        username: 'david pinarto',
        password: 'david',
        fullname: 'david pinarto',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot create user because username contain restricted character');
    });
  });
});
