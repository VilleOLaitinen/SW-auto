import express from 'express';
import CarsService from '../services/cars.service.js';

// base route /api/v1/cars
const router = express.Router();

router.get('/makes', async (req, res) => {
  const carMakes = await CarsService.GetMakes();
  res.send(carMakes);
});

router.get('/models', async (req, res) => {
  if (!req.query.make) {
    return res.status(400).send({ error: 'make is required' });
  }
  const carModels = await CarsService.GetModels(req.query.make);
  res.send(carModels);
});

export default router;
