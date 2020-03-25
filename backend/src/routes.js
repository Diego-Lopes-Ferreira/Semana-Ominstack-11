//node
const express = require('express');

//mine
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionsController = require('./controllers/sessionsController');
const routes = express.Router();

//routes
//index (just a test)
routes.get('/', (request, response) => {
  const params = request.body;
  console.log(params);

  return response.json({ 
    "info" : "nao e da internet",
    "name" : "ericson"
  });
});

//incidents
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.createIncident);
routes.delete('/incidents/:id', incidentController.deleteIncident);

//ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.createOng);

//profile
routes.get('/profile', profileController.index);

//sessions
routes.post('/sessions', sessionsController.login);

module.exports = routes;
