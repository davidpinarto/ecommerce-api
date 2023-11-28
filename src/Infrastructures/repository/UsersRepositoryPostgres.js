const InvariantError = require('../../Commons/exceptions/InvariantError');
const UsersRepository = require('../../Domains/users/UsersRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UsersRepositoryPostgres extends UsersRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length) {
      throw new InvariantError('Username already been taken');
    }
  }

  async addRegisterUser(registerUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser(result.rows[0]);
  }

  async verifyUsernameIsRegistered(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Username is not registered');
    }
  }

  async getIdByUsername(username) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getEncryptedPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = UsersRepositoryPostgres;
