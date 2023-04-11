const { urlencoded } = require('express');
var express = require('express');
var path = require('path');
var port = 8081;
// var db = require('./config/mongoose');
var passport = require('passport');
var passpotLocal = require('./config/passport-local');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var db='mongodb+srv://mansakadasariya:man@man.jbykfvz.mongodb.net/admin_panel'

mongoose.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> {
    console.log("Db connected.");
}).catch((err)=> {
    console.log(err);
});



var app = express();

app.use(cookieParser());
app.use(urlencoded());
app.use(express.static('assets'));
app.use('/assets/img',express.static(path.join(__dirname,'assets/img')))

app.use(session({
    name : "Man",
    secret : "College",
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 600*1000*100
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.listen(port, function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running on port = ",port);
});