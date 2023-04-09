var express = require('express');
var routes = express.Router();
var teacherController = require('../controller/teacherController');
var teacher = require('../models/teacher');

routes.get('/insertTeacher', teacherController.insertTeacher);
routes.post('/addTeacherData', teacher.uploadedAvatar, teacherController.addTeacherData);
routes.get('/activeTeacher', teacherController.activeTeacher);
routes.get('/deactiveTeacher', teacherController.deactiveTeacher);
routes.get('/deleteData/:id', teacherController.deleteData);
routes.get('/updateData/:id', teacherController.updateData);
routes.post('/editData',teacher.uploadedAvatar, teacherController.editData);
routes.get('/deActive/:id', teacherController.deActive);
routes.get('/Active/:id', teacherController.Active);
routes.get('/viewStudent/:id', teacherController.viewStudent);

module.exports = routes;