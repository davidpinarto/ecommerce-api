const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableTestHelper = {
  async getRefreshToken() {
    const result = await pool.query('SELECT * FROM authentications');

    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE authentications');
  },
};

module.exports = AuthenticationsTableTestHelper;
