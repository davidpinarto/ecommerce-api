const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/authentications endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /authentications', () => {
    it('should response 201 and persist refreshToken in database', async () => {
      const server = await createServer(container);

      const requestPayload = {
        username: 'david',
        password: 'david',
      };

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'david',
          password: 'david',
          fullname: 'david pinarto',
        },
      });

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.newAuth).toBeDefined();
    });

    it('should response 400 when request payload did not contain needed property', async () => {
      const requestPayload = {
        username: 'david',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot login because payload did not contain needed property');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'david',
        password: true,
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('cannot login because payload did not meet data type specification');
    });

    it('should response 400 when username is not registered', async () => {
      const requestPayload = {
        username: 'david',
        password: 'david',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Username is not registered');
    });

    it('should response 401 when password is not match', async () => {
      const requestPayload = {
        username: 'david',
        password: 'daavviddd',
      };

      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'david',
          password: 'david',
          fullname: 'david pinarto',
        },
      });

      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Wrong user credential');
    });
  });
});
