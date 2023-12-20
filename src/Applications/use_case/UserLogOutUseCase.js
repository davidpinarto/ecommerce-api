class UserLogOutUseCase {
  constructor({ authenticationsRepository }) {
    this._authenticationsRepository = authenticationsRepository;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);

    const { refreshToken } = useCasePayload;

    await this._authenticationsRepository.verifyRefreshToken(refreshToken);
    await this._authenticationsRepository.deleteRefreshToken(refreshToken);
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('USER_LOG_OUT_USE_CASE.USE_CASE_PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('USER_LOG_OUT_USE_CASE.USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogOutUseCase;
