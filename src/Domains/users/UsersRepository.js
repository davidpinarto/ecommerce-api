class UsersRepository {
  async verifyAvailableUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addRegisterUser(registerUser) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyUsernameIsRegistered(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getIdByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getEncryptedPasswordByUsername(username) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UsersRepository;
