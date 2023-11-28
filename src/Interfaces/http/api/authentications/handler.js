const UserLoginUseCase = require('../../../../Applications/use_case/UserLoginUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
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
}

module.exports = AuthenticationsHandler;
