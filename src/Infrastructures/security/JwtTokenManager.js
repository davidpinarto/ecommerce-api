const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');

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
}

module.exports = JwtTokenManager;
