import NettixService from './nettix.service.js';
import axios from 'axios';

export class AnttiService {
  static async GetCars() {
    const requestUrl = 'https://api.nettix.fi/rest/car/options/make';

    const makes = await axios.get(requestUrl, {
      headers: {
        'X-Access-Token': await NettixService.GetToken(),
      },
    });
    return makes.data;
  }
  static async GetIdFromName(brandName) {
    const cars = await AnttiService.GetCars();
    for (let x of cars) {
      if (x['name'] == brandName) {
        return x['id'];
      }
    }
  }
  static async GetNameFromId(makeId) {
    const cars = await AnttiService.GetCars();
    for (let x of cars) {
      if (x['id'] == makeId) {
        return x['name'];
      }
    }
  }

  static async GetAvgPriceOfMake(makeId, sampleSize = 100) {
    if (sampleSize > 100) {
      console.log('sampleSize has max value of 100, changed to 100');
      sampleSize = 100;
    }
    const requestUrl =
      'https://api.nettix.fi/rest/car/search?make=' +
      makeId +
      '&sortBy=dateCreated' +
      '&rows=' +
      sampleSize;
    const request = await axios.get(requestUrl, {
      headers: {
        'X-Access-Token': await NettixService.GetToken(),
      },
    });
    let cars = request.data;
    let counter = 0;
    for (let x of cars) {
      if (x['isPriced'] == true) {
        counter += x['price'];
      }
    }
    return counter / cars.length;
  }
}
