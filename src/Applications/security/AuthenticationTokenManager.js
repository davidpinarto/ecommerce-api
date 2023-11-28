class AuthenticationTokenManager {
  async generateAccessToken(payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async generateRefreshToken(payload) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async verifyRefreshToken(refreshToken) {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationTokenManager;
