var express = require('express');
var routes = express.Router();
var studentController = require('../controller/studentController');
var student = require('../models/student');

routes.get('/insertStudent', studentController.insertStudent);
routes.post('/addStudentData', student.uploadedAvatar , studentController.addStudentData);
routes.get('/activeStudent', studentController.activeStudent);
routes.get('/deactiveStudent', studentController.deactiveStudent);
routes.get('/deleteData/:id', studentController.deleteData);
routes.get('/updateData/:id', studentController.updateData);
routes.post('/editData', student.uploadedAvatar,     studentController.editData);
routes.get('/deActive/:id', studentController.deActive);
routes.get('/Active/:id', studentController.Active);
routes.post('/getTeacherData', studentController.getTeacherData);

module.exports = routes;