const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const UsersRepositoryPostgres = require('../UsersRepositoryPostgres');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');

describe('UsersRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw error when username is already been taken', async () => {
      await UsersTableTestHelper.addUser({});
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      await expect(usersRepositoryPostgres.verifyAvailableUsername('david'))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw error when username is available', async () => {
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      await expect(usersRepositoryPostgres.verifyAvailableUsername('david'))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('addRegisterUser function', () => {
    it('should persist new registered user on database', async () => {
      const registerUser = new RegisterUser({
        username: 'david',
        password: 'david',
        fullname: 'david pinarto',
      });

      const fakeIdGenerator = () => '123';
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, fakeIdGenerator);

      await usersRepositoryPostgres.addRegisterUser(registerUser);

      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });

    it('should return registered user object correctly', async () => {
      const registerUser = new RegisterUser({
        username: 'david',
        password: 'david',
        fullname: 'david pinarto',
      });

      const fakeIdGenerator = () => '123';
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, fakeIdGenerator);

      const registeredUser = await usersRepositoryPostgres.addRegisterUser(registerUser);

      expect(registeredUser).toEqual(new RegisteredUser({
        id: 'user-123',
        username: 'david',
        fullname: 'david pinarto',
      }));
    });
  });

  describe('verifyUsernameIsRegistered function', () => {
    it('should throw error when username not registered', async () => {
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      await expect(usersRepositoryPostgres.verifyUsernameIsRegistered('david'))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw error when username is registered', async () => {
      await UsersTableTestHelper.addUser({});
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      await expect(usersRepositoryPostgres.verifyUsernameIsRegistered('david'))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('getIdByUsername function', () => {
    it('should get id by username and return object that contain user id correctly', async () => {
      await UsersTableTestHelper.addUser({});
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      const { id } = await usersRepositoryPostgres.getIdByUsername('david');

      expect(id).toEqual('user-123');
    });
  });

  describe('getEncryptedPasswordByUsername function', () => {
    it('should get user encrypted password by username and return object that contain password correctly', async () => {
      await UsersTableTestHelper.addUser({ password: 'encrypted_password' });
      const usersRepositoryPostgres = new UsersRepositoryPostgres(pool, {});

      const { password } = await usersRepositoryPostgres.getEncryptedPasswordByUsername('david');

      expect(password).toEqual('encrypted_password');
    });
  });
});
