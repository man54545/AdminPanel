var mongoose = require('mongoose');

var principalSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
});

var principal = mongoose.model('principal', principalSchema);

module.exports = principal;