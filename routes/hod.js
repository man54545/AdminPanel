var express = require('express');
var routes = express.Router();
var hodController = require('../controller/hodController');
const hod = require('../models/hod');

routes.get('/insertHod', hodController.insertHod);
routes.post('/addHodData',hod.uploadedAvatar, hodController.addHodData);
routes.get('/activeHod', hodController.activeHod);
routes.get('/deactiveHod', hodController.deactiveHod);
routes.get('/deleteData/:id', hodController.deleteData);
routes.get('/updateData/:id', hodController.updateData);
routes.post('/editData',hod.uploadedAvatar, hodController.editData);
routes.get('/deActive/:id', hodController.deActive);
routes.get('/Active/:id', hodController.Active);
routes.get('/viewTeacher/:id', hodController.viewTeacher);
routes.get('/sendMail/:id', hodController.sendMail);
routes.post('/MailData/:id', hodController.MailData);

module.exports = routes;