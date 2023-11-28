const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuth = require('../../Domains/authentications/entities/NewAuth');

class UserLoginUseCase {
  constructor({
    usersRepository, authenticationsRepository, passwordHash, authenticationTokenManager,
  }) {
    this._usersRepository = usersRepository;
    this._authenticationsRepository = authenticationsRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);
    await this._usersRepository.verifyUsernameIsRegistered(username);
    const { password: encryptedPassword } = await this._usersRepository
      .getEncryptedPasswordByUsername(username);
    await this._passwordHash.comparePassword(password, encryptedPassword);
    const { id } = await this._usersRepository.getIdByUsername(username);
    const accessToken = await this._authenticationTokenManager
      .generateAccessToken({ id, username });
    const refreshToken = await this._authenticationTokenManager
      .generateRefreshToken({ id, username });
    await this._authenticationsRepository.addRefreshToken(refreshToken);
    const newAuth = new NewAuth({
      accessToken,
      refreshToken,
    });
    return newAuth;
  }
}

module.exports = UserLoginUseCase;
