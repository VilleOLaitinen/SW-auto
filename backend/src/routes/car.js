import express from 'express';
import CarsService from '../services/cars.service.js';
import NettixService from '../services/nettix.service.js';

// base route /api/v1/cars
const router = express.Router();

router.get('/', async (req, res) => {
  const carMakes = await CarsService.GetMakes();
  res.send(carMakes);
});

export default router;
