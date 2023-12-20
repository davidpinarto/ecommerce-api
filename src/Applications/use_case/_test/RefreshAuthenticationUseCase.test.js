const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain needed property', async () => {
    const useCasePayload = {};
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrow('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if use case payload not meet data type specification', async () => {
    const useCasePayload = {
      refreshToken: true,
    };
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects.toThrow('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating RefreshAuthenticationUseCase correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };

    const mockAuthenticationsRepository = new AuthenticationsRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationTokenManager.verifyRefreshTokenSignature = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationsRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'david', id: 'user-123' }));
    mockAuthenticationTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('new_access_token'));

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationsRepository: mockAuthenticationsRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

    expect(mockAuthenticationTokenManager.verifyRefreshTokenSignature)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationsRepository.verifyRefreshToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.generateAccessToken)
      .toHaveBeenCalledWith({ username: 'david', id: 'user-123' });
    expect(accessToken).toEqual('new_access_token');
  });
});
