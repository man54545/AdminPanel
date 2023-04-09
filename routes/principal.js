var express = require('express');
var routes = express.Router();
var principalController = require('../controller/principalController');

routes.get('/insertPrincipal', principalController.insertPrincipal);
routes.get('/viewPrincipal', principalController.viewPrincipal);
routes.post('/addPrincipalData', principalController.addPrincipalData);
routes.get('/deleteData/:id', principalController.deleteData);
routes.get('/updateData/:id', principalController.updateData);
routes.post('/editData', principalController.editData);

module.exports = routes;