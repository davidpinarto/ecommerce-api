const PasswordHash = require('../../Applications/security/PasswordHash');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(plainPassword, encryptedPassword) {
    const match = await this._bcrypt.compare(plainPassword, encryptedPassword);

    if (!match) {
      throw new AuthenticationError('Wrong user credential');
    }
  }
}

module.exports = BcryptPasswordHash;
