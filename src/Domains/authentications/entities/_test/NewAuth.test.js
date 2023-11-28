const NewAuth = require('../NewAuth');

describe('NewAuth entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      accessToken: 'accessToken',
    };

    expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should create NewAuth object correctly', () => {
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    const { accessToken, refreshToken } = new NewAuth(payload);

    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
