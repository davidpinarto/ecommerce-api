const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('AuthenticationTokenManager interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const authenticationTokenManager = new AuthenticationTokenManager({});

    await expect(authenticationTokenManager.generateAccessToken({}))
      .rejects.toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.generateRefreshToken({}))
      .rejects.toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.verifyRefreshTokenSignature(''))
      .rejects.toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.decodePayload(''))
      .rejects.toThrow('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
