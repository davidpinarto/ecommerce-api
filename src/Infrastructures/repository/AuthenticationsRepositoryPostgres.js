const AuthenticationsRepository = require('../../Domains/authentications/AuthenticationsRepository');

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
}

module.exports = AuthenticationsRepositoryPostgres;
