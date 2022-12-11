import axios from 'axios';
import Cache from 'async-disk-cache';
import Environment from '../environment.js';

export default class NettixService {
  static #baseUrl = 'https://auth.nettix.fi/';

  static #accessToken = '';
  static #refreshToken = '';
  static #expireTime = 0;
  static #cache = new Cache('sw-auto');

  static async GetToken() {
    const currentTime = new Date().getTime();

    if (await NettixService.#cache.has('NettixRefreshToken')) {
      const cachedToken = await NettixService.#cache.get('NettixRefreshToken');
      console.log('Disk cached Nettix refresh token:', cachedToken);
      NettixService.#refreshToken = cachedToken.value;
    }

    if (
      NettixService.#refreshToken &&
      currentTime > NettixService.#expireTime
    ) {
      const refresh = await NettixService.RefreshToken(
        NettixService.#refreshToken
      );

      if (!refresh) {
        console.log(
          "Couldn't refresh token, resetting access and refresh tokens"
        );
        await NettixService.#cache.remove('NettixRefreshToken');
      }

      // if refresh is null, both of these will be null, if not then proper values are set
      NettixService.#accessToken = refresh?.access_token;
      NettixService.#refreshToken = refresh?.refresh_token;
      NettixService.#expireTime = currentTime + refresh?.expires_in * 1000;
    }

    if (!NettixService.#accessToken || !NettixService.#refreshToken) {
      const auth = await NettixService.Authenticate(
        Environment.nettix.email,
        Environment.nettix.password
      );

      if (!auth) {
        throw new Error('Unable to authenticate with nettix');
      }

      await NettixService.#cache.set('NettixRefreshToken', auth.refresh_token);

      NettixService.#accessToken = auth.access_token;
      NettixService.#refreshToken = auth.refresh_token;
      NettixService.#expireTime = currentTime + auth.expires_in * 1000;
    }

    return NettixService.#accessToken;
  }

  static async Authenticate(email, password) {
    console.log('Authenticate()', email);
    return await NettixService.#oauth2(
      new URLSearchParams({
        grant_type: 'password',
        email,
        password,
      })
    );
  }

  static async RefreshToken(token) {
    console.log('RefreshToken()', token);
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
      console.log('oauth2()', response.data);
      return response.data;
    } catch (e) {
      console.error('oauth() error:', e.message, e.response.data, form);
      return null;
    }
  }
}
