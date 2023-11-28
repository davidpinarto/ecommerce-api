const UsersRepository = require('../UsersRepository');

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const userRepository = new UsersRepository();

    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.addRegisterUser({})).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.verifyUsernameIsRegistered('')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getIdByUsername('')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.getEncryptedPasswordByUsername('')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
