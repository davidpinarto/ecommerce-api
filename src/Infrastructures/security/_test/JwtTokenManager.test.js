// const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');

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

  // describe('verifyRefreshToken function', async () => {
  //   it('should verifyRefreshToken correctly', async () => {
  //     const mockJwtToken = {
  //       decode: jest.fn().mockImplementation(() => 'artifacts'),
  //       verifySignature: jest.fn().mockImplementation(())
  //     };
  //   });
  // });
});
