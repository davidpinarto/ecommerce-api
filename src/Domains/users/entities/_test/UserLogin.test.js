const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      username: 'david',
    };

    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      username: true,
      password: 'david',
    };

    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create UserLogin object correctly', () => {
    const payload = {
      username: 'david',
      password: 'david',
    };

    const { username, password } = new UserLogin(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
