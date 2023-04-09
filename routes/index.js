var express = require('express');
var routes = express.Router();
var passport = require('passport');
var adminController = require('../controller/adminController');

routes.get('/',passport.checkAuthentication,adminController.Dashboard);
routes.get('/register', adminController.register);
routes.post('/registerProcess', adminController.registerProcess);
routes.get('/login', adminController.login);
routes.get('/viewProfile',passport.checkAuthentication, adminController.viewProfile);
routes.get('/loginViewProfile', adminController.loginViewProfile);
routes.get('/hodProfile',passport.checkAuthentication, adminController.hodProfile);
routes.post('/loginProcess', passport.authenticate('local', {failureRedirect : '/login'}) , adminController.loginProcess);
routes.get('/logOut', function(req,res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('login');
    });
});
routes.get('/lostPass', adminController.lostPass);
routes.post('/LostPass', adminController.LostPass);
routes.get('/optPage', adminController.optPage);
routes.post('/checkOtp', adminController.checkOtp);
routes.get('/genrateNewpass', adminController.genrateNewpass);
routes.post('/checkNewPass', adminController.checkNewPass);
routes.get('/changePass', adminController.changePass);
routes.post('/newPass', adminController.newPass);

routes.use('/principal',passport.checkAuthentication, require('./principal'));
routes.use('/hod',passport.checkAuthentication, require('./hod'));
routes.use('/teacher',passport.checkAuthentication, require('./teacher'));
routes.use('/student',passport.checkAuthentication, require('./student'));

module.exports = routes;