const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot create user because payload did not contain needed property'),
  'REGISTER_USER.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('cannot create user because payload did not meet data type specification'),
  'REGISTER_USER.USERNAME_LIMIT_CHARACTER': new InvariantError('cannot create user because username reach max limit character'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('cannot create user because username contain restricted character'),
  'USER_LOGIN.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('cannot login because payload did not contain needed property'),
  'USER_LOGIN.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('cannot login because payload did not meet data type specification'),
};

module.exports = DomainErrorTranslator;
