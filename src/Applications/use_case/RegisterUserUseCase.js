const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class RegisterUserUseCase {
  constructor({ usersRepository, passwordHash }) {
    this._usersRepository = usersRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._usersRepository.verifyAvailableUsername(useCasePayload.username);
    registerUser.password = await this._passwordHash.hash(useCasePayload.password);
    return this._usersRepository.addRegisterUser(registerUser);
  }
}

module.exports = RegisterUserUseCase;
