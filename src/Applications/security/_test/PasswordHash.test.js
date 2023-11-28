const PasswordHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const passwordHash = new PasswordHash();

    await expect(passwordHash.hash).rejects.toThrow('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    await expect(passwordHash.comparePassword).rejects.toThrow('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
