import NettixService from './nettix.service.js';
import Environment from '../environment.js';
import axios from 'axios';
import Cache from 'async-disk-cache';

export default class CarsService {
  static #baseUrl = 'https://api.nettix.fi/rest/car/';

  static #accessToken = '';
  static #refreshToken = '';
  static #expireTime = 0;
  static #cache = new Cache('sw-auto');

  static async #getToken() {
    const currentTime = new Date().getTime();

    if (await this.#cache.has('NettixRefreshToken')) {
      const cachedToken = await this.#cache.get('NettixRefreshToken');
      console.log('Disk cached Nettix refresh token:', cachedToken);
      this.#refreshToken = cachedToken.value;
    }

    if (CarsService.#refreshToken && currentTime > CarsService.#expireTime) {
      const refresh = await NettixService.RefreshToken(
        CarsService.#refreshToken
      );

      if (!refresh) {
        console.log(
          "Couldn't refresh token, resetting access and refresh tokens"
        );
        await this.#cache.remove('NettixRefreshToken');
      }

      // if refresh is null, both of these will be null, if not then proper values are set
      CarsService.#accessToken = refresh?.access_token;
      CarsService.#refreshToken = refresh?.refresh_token;
      CarsService.#expireTime = currentTime + refresh?.expires_in * 1000;
    }

    if (!CarsService.#accessToken || !CarsService.#refreshToken) {
      const auth = await NettixService.Authenticate(
        Environment.nettix.email,
        Environment.nettix.password
      );

      if (!auth) {
        throw new Error('Unable to authenticate with nettix');
      }

      await this.#cache.set('NettixRefreshToken', auth.refresh_token);

      CarsService.#accessToken = auth.access_token;
      CarsService.#refreshToken = auth.refresh_token;
      CarsService.#expireTime = currentTime + auth.expires_in * 1000;
    }

    return CarsService.#accessToken;
  }

  static async GetMakes() {
    try {
      const token = await CarsService.#getToken();

      const makes = await axios.get(this.#baseUrl + 'options/make', {
        headers: {
          'X-Access-Token': token,
        },
      });
      return makes.data;
    } catch (e) {
      console.error('GetMakes() error:', e.message);
    }
  }

  static async GetModels(makeId) {
    try {
      const token = await CarsService.#getToken();

      // prevent LFI
      makeId = parseInt(makeId);

      const models = await axios.get(
        this.#baseUrl + `options/model?makeId=${makeId}`,
        {
          headers: {
            'X-Access-Token': token,
          },
        }
      );
      return models.data;
    } catch (e) {
      console.error('GetModels() error:', e.message);
    }
  }
}
