const AuthenticationsRepositoryPostgres = require('../AuthenticationsRepositoryPostgres');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');

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
});
