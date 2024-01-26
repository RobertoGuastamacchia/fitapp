const express = require('express');

const httpContext = require('express-http-context');

const bodyParser = require('body-parser');

const groceryRoutes = require('./routes/misi');

const errorController = require('./controllers/error');

const app = express();

app.use(httpContext.middleware);

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use('/misi', groceryRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports,'localhost', () => console.log(`listening on port ${ports}`));
