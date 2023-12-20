const AuthenticationsRepository = require('../../../Domains/authentications/AuthenticationsRepository');
const UserLogOutUseCase = require('../UserLogOutUseCase');

describe('UserLogOutUseCase', () => {
  it('should throw error when useCasePayload not contain needed property', async () => {
    const userLogOutUseCase = new UserLogOutUseCase({});

    await expect(userLogOutUseCase.execute({}))
      .rejects.toThrow('USER_LOG_OUT_USE_CASE.USE_CASE_PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if refresh token is not string', async () => {
    const userLogOutUseCase = new UserLogOutUseCase({});

    await expect(userLogOutUseCase.execute({ refreshToken: 123 }))
      .rejects.toThrow('USER_LOG_OUT_USE_CASE.USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating UserLogOutUseCase correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };

    const mockAuthenticationsRepository = new AuthenticationsRepository();

    mockAuthenticationsRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationsRepository.deleteRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const userLogOutUseCase = new UserLogOutUseCase({
      authenticationsRepository: mockAuthenticationsRepository,
    });

    await userLogOutUseCase.execute(useCasePayload);

    expect(mockAuthenticationsRepository.verifyRefreshToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationsRepository.deleteRefreshToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
  });
});
