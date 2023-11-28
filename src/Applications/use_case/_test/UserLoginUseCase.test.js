const UserLoginUseCase = require('../UserLoginUseCase');
const UsersRepository = require('../../../Domains/users/UsersRepository');
const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const PasswordHash = require('../../security/PasswordHash');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('UserLoginUseCase', () => {
  it('should orchestrating UserLoginUseCase correctly', async () => {
    const useCasePayload = {
      username: 'david',
      password: 'david',
    };

    const mockUsersRepository = new UsersRepository();
    const mockAuthenticationsRepository = new AuthenticationsRepository();
    const mockPasswordHash = new PasswordHash();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockUsersRepository.verifyUsernameIsRegistered = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUsersRepository.getEncryptedPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve({ password: 'encrypted_password' }));
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUsersRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: 'user-123' }));
    mockAuthenticationTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('access_token'));
    mockAuthenticationTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('refresh_token'));
    mockAuthenticationsRepository.addRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const userLoginUseCase = new UserLoginUseCase({
      usersRepository: mockUsersRepository,
      authenticationsRepository: mockAuthenticationsRepository,
      passwordHash: mockPasswordHash,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    const newAuth = await userLoginUseCase.execute(useCasePayload);

    expect(newAuth).toEqual(new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    }));
    expect(mockUsersRepository.verifyUsernameIsRegistered)
      .toHaveBeenCalledWith('david');
    expect(mockUsersRepository.getEncryptedPasswordByUsername)
      .toHaveBeenCalledWith('david');
    expect(mockPasswordHash.comparePassword).toHaveBeenCalledWith('david', 'encrypted_password');
    expect(mockUsersRepository.getIdByUsername)
      .toHaveBeenCalledWith('david');
    expect(mockAuthenticationTokenManager.generateAccessToken)
      .toHaveBeenCalledWith({ id: 'user-123', username: 'david' });
    expect(mockAuthenticationTokenManager.generateRefreshToken)
      .toHaveBeenCalledWith({ id: 'user-123', username: 'david' });
    expect(mockAuthenticationsRepository.addRefreshToken)
      .toHaveBeenCalledWith('refresh_token');
  });
});
