const RegisterUserUseCase = require('../../../../Applications/use_case/RegisterUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const registerUserUseCase = this._container.getInstance(RegisterUserUseCase.name);
    const registeredUser = await registerUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        registeredUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
