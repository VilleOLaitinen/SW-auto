import NettixService from "./nettix.service.js";
import Environment from "../environment.js";
import axios from "axios";

export default class CarsService {

  static #baseUrl = "https://api.nettix.fi/rest/car/";

  static #accessToken = "";
  static #refreshToken = "";
  static #expireTime = 0;

  static async #getToken() {

    const currentTime = new Date().getTime();
    let response = null; // just to reduce repeated code

    if (!CarsService.#accessToken || !CarsService.#refreshToken) {
      const auth = await NettixService.Authenticate(Environment.nettix.email, Environment.nettix.password);

      if (!auth) {
        throw new Error("Unable to authenticate with nettix");
      }

      response = auth;
    }

    if (CarsService.#refreshToken && currentTime > CarsService.#expireTime) {
      response = await NettixService.RefreshToken(CarsService.#refreshToken);
    }

    if (response) {
      // we should add some error handling here
      CarsService.#accessToken = response.access_token;
      CarsService.#refreshToken = response.refresh_token;
      // store expiration time as a unix timestamp in milliseconds
      CarsService.#expireTime = currentTime + response.expires_in * 1000;
    }

    return CarsService.#accessToken;
  }

  static async GetMakes() {
    try {
      const token = await CarsService.#getToken();

      const makes = await axios.get(this.#baseUrl + "options/make", {
        headers: {
          'X-Access-Token': token
        }
      });
      return makes.data;
    } catch (e) {
      console.error("GetMakes() error:", e.message);
    }
  }
}
