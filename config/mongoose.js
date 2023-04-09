const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/College');

var college = mongoose.connection;

college.once('open', function(err){
    if(err)
    {
        console.log("Db is not connected.");
        return false;
    }
    console.log("Db is connected.");
});

module.exports = college;