var passport = require('passport');
var passportLocal = require('passport-local').Strategy;
var principal = require('../models/principal');

passport.use(new passportLocal({
    usernameField : "email"
}, async function(email, password, done){
    var data = await principal.findOne({email : email});

    if(!data || data.password != password){
        console.log("Invalid password and email.");
        return done(null, false);
    }
    else{
        return done(null,data);
        console.log('data');
    }
}));

passport.serializeUser(function(data, done){
    return done(null, data.id);
});

passport.deserializeUser(async function(id, done){
    var data = await principal.findById(id);
    if(data){
        return done(null, data);
    }
    else
    {
        console.log('err');
        return done(null,'err');
    }
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.data;
    }
    next();
}

module.exports = passport;