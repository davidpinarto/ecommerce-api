class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    const { accessToken, refreshToken } = payload;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error('NEW_AUTH.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}

module.exports = NewAuth;
