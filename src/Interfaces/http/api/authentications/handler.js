const UserLoginUseCase = require('../../../../Applications/use_case/UserLoginUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
    this.putAuthenticationsHandler = this.putAuthenticationsHandler.bind(this);
  }

  async postAuthenticationsHandler(request, h) {
    const userLoginUseCase = this._container.getInstance(UserLoginUseCase.name);
    const newAuth = await userLoginUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        newAuth,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationsHandler(request, h) {
    const refreshAuthenticationUseCase = this._container
      .getInstance(RefreshAuthenticationUseCase.name);

    const newAccessToken = await refreshAuthenticationUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken: newAccessToken,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = AuthenticationsHandler;
