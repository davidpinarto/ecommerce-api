const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async generateAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async generateRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshTokenSignature(refreshToken) {
    try {
      const artifacts = this._jwt.decode(refreshToken);
      this._jwt.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('Refresh token is not valid');
    }
  }

  async decodePayload(refreshToken) {
    const artifacts = this._jwt.decode(refreshToken);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
