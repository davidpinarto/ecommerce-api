const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser entities', () => {
  it('should return RegisteredUser object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'david',
      fullname: 'david pinarto',
    };

    const { id, username, fullname } = new RegisteredUser(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
