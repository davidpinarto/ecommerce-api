const pool = require('../src/Infrastructures/database/postgres/pool');

const AuthenticationsTableTestHelper = {
  async getRefreshToken() {
    const result = await pool.query('SELECT * FROM authentications');

    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE authentications');
  },

  async addRefreshToken({ refreshToken = 'refreshToken' }) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [refreshToken],
    };

    await pool.query(query);
  },
};

module.exports = AuthenticationsTableTestHelper;
