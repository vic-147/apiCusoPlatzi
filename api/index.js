const express = require('express');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//necesario para recibir los post correctamente
app.use(express.json());

//controlar lo origenes
const whitelist = ["http://localhost:8080", "http://localhost:5500"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitogo'));
    }
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Dí hola a express');
});

app.get('/api/home', (req, res) => {
  res.json({
    name: 'Potatoes',
    lastName: 'Picante',
  });
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port es ' + port);
});
