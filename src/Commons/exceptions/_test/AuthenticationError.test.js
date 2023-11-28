const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create an error correctly', () => {
    const authenticationError = new AuthenticationError('Wrong user credentials');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('Wrong user credentials');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
