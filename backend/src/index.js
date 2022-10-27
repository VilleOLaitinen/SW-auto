import Environment from './environment.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import carRoutes from './routes/car.js';

const app = express();

// express plugins
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

// express sub-route paths
app.use('/api/v1/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

// express listen
console.log(`Server listening on port ${Environment.server.port}`);
app.listen(Environment.server.port);
