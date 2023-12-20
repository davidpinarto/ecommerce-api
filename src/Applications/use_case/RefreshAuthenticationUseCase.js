class RefreshAuthenticationUseCase {
  constructor({ authenticationsRepository, authenticationTokenManager }) {
    this._authenticationsRepository = authenticationsRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;

    await this._authenticationsRepository.verifyRefreshToken(refreshToken);
    await this._authenticationTokenManager.verifyRefreshTokenSignature(refreshToken);

    const { username, id } = await this._authenticationTokenManager.decodePayload(refreshToken);

    return this._authenticationTokenManager.generateAccessToken({ username, id });
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
