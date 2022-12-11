import NettixService from './nettix.service.js';
import axios from 'axios';

export default class CarsService {
  static #baseUrl = 'https://api.nettix.fi/rest/car/';

  static async GetMakes() {
    try {
      const token = await NettixService.GetToken();
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
      const token = await NettixService.GetToken();

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
