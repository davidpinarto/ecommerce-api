const AuthenticationsRepository = require('../../Domains/authentications/AuthenticationsRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class AuthenticationsRepositoryPostgres extends AuthenticationsRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Refresh Token is not available');
    }
  }
}

module.exports = AuthenticationsRepositoryPostgres;
