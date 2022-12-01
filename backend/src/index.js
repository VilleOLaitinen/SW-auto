import Environment from './environment.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import carRoutes from './routes/car.js';
import { customMiddleware } from './middleware.js';
import { AnttiService } from './services/antti.service.js';

const app = express();
// express plugins
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

// custom middlewares
app.use(customMiddleware);

// express sub-route paths
app.use('/api/v1/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

// express listen
console.log(`Server listening on port ${Environment.server.port}`);
app.listen(Environment.server.port);
console.log(
  await AnttiService.GetAvgPriceOfMake(
    await AnttiService.GetIdFromName('Mercedes-Benz'),
    100,
    'price'
  )
);
