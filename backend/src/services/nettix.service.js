import axios from 'axios';

export default class NettixService {
  static #baseUrl = 'https://auth.nettix.fi/';

  static async Authenticate(email, password) {
    return await NettixService.#oauth2(
      new URLSearchParams({
        grant_type: 'password',
        email,
        password,
      })
    );
  }

  static async RefreshToken(token) {
    return await NettixService.#oauth2(
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token,
      })
    );
  }

  static async #oauth2(form) {
    try {
      const response = await axios.post(this.#baseUrl + 'oauth2/token', form);
      console.log('Authenticate()', response.data);
      return response.data;
    } catch (e) {
      console.error('oauth() error:', e.message, e.response.data, form);
      return null;
    }
  }
}
