var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/assets/img');

var hodSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
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
    education : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
});

var storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});

hodSchema.statics.uploadedAvatar = multer({ storage : storage }).single('avatar');
hodSchema.statics.avatarPath = AVATAR_PATH;

var hod = mongoose.model('hod', hodSchema);

module.exports = hod;