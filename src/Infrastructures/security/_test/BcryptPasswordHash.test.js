const bcrypt = require('bcrypt');
const BcryptPasswordHash = require('../BcryptPasswordHash');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');

describe('BcryptPasswordHash', () => {
  describe('Hash function', () => {
    it('should hash the plain password', async () => {
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      const hashedPassword = await bcryptPasswordHash.hash('plain_password', 10);

      expect(hashedPassword).not.toEqual('plain_password');
      expect(spyHash).toHaveBeenCalledWith('plain_password', 10);
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError when password not match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      await expect(bcryptPasswordHash.comparePassword('plain_password', 'encrypted_password'))
        .rejects.toThrow(AuthenticationError);
    });

    it('should not throw AuthenticationError when password is matched', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const plainPassword = 'david';
      const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

      await expect(bcryptPasswordHash.comparePassword(plainPassword, encryptedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
