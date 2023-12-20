const AuthenticationsRepository = require('../AuthenticationsRepository');

describe('AuthenticationsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const authenticationsRepository = new AuthenticationsRepository();

    await expect(authenticationsRepository.addRefreshToken('')).rejects.toThrow('AUTHENTICATIONS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationsRepository.verifyRefreshToken('')).rejects.toThrow('AUTHENTICATIONS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
