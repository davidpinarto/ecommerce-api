const AuthenticationsRepositoryPostgres = require('../AuthenticationsRepositoryPostgres');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('AuthenticationsRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('addRefreshToken function', () => {
    it('should persist refreshToken on database', async () => {
      const authenticationsRepositoryPostgres = new AuthenticationsRepositoryPostgres(pool);

      await authenticationsRepositoryPostgres.addRefreshToken('refreshToken');

      const checkRefreshToken = await AuthenticationsTableTestHelper.getRefreshToken();
      expect(checkRefreshToken).toHaveLength(1);
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw error when refreshToken is not available database', async () => {
      const authenticationsRepositoryPostgres = new AuthenticationsRepositoryPostgres(pool);

      await expect(authenticationsRepositoryPostgres.verifyRefreshToken('refreshToken'))
        .rejects.toThrow('Refresh Token is not available');
    });

    it('should not throw error when refreshToken is available in database', async () => {
      await AuthenticationsTableTestHelper.addRefreshToken({});
      const authenticationsRepositoryPostres = new AuthenticationsRepositoryPostgres(pool);

      await expect(authenticationsRepositoryPostres.verifyRefreshToken('refreshToken'))
        .resolves.not.toThrow(NotFoundError);
    });
  });

  describe('deleteRefreshToken function', () => {
    it('should delete refresh token in database correctly', async () => {
      await AuthenticationsTableTestHelper.addRefreshToken({});
      const authenticationsRepositoryPostgres = new AuthenticationsRepositoryPostgres(pool);

      await authenticationsRepositoryPostgres.deleteRefreshToken('refreshToken');

      const findRefreshToken = await AuthenticationsTableTestHelper.findRefreshToken('refreshToken');
      expect(findRefreshToken).toHaveLength(0);
    });
  });
});
