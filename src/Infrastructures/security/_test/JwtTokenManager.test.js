const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('JwtTokenManager', () => {
  describe('generateAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      const payload = {
        id: 'user-123',
        username: 'david',
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_access_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const accessToken = await jwtTokenManager.generateAccessToken(payload);

      expect(mockJwtToken.generate).toHaveBeenCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_access_token');
    });
  });

  describe('generateRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      const payload = {
        id: 'user-123',
        username: 'david',
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_refresh_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const refreshToken = await jwtTokenManager
        .generateRefreshToken(payload, process.env.REFRESH_TOKEN_KEY);

      expect(mockJwtToken.generate).toHaveBeenCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toEqual('mock_refresh_token');
    });
  });

  describe('verifyRefreshTokenSignature function', () => {
    it('should throw error when refresh token signature is not valid', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.generateAccessToken({ username: 'david', id: 'user-123' });

      await expect(jwtTokenManager.verifyRefreshTokenSignature(accessToken))
        .rejects.toThrow('Refresh token is not valid');
    });

    it('should verifyRefreshTokenSignature correctly', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.generateRefreshToken({ username: 'david', id: 'user-123' });

      await expect(jwtTokenManager.verifyRefreshTokenSignature(refreshToken))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.generateRefreshToken({ username: 'david', id: 'user-123' });

      const { username, id } = await jwtTokenManager.decodePayload(refreshToken);

      expect(username).toEqual('david');
      expect(id).toEqual('user-123');
    });
  });
});
