const RegisterUser = require('../RegisterUser');

describe('RegisterUser Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'david',
      password: 'david',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'david',
      password: 'david',
      fullname: true,
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username reach max limit character', () => {
    const payload = {
      username: 'daviddaviddaviddaviddaviddaviddaviddaviddaviddaviddavid',
      password: 'david',
      fullname: 'david pinarto',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHARACTER');
  });

  it('should throw error when username contain restricted character', () => {
    const payload = {
      username: 'david#<',
      password: 'david',
      fullname: 'david pinarto',
    };

    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should return RegisterUser object correctly', () => {
    const payload = {
      username: 'david',
      password: 'david',
      fullname: 'david pinarto',
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
