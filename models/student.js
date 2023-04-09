var mongoose = require('mongoose');
const multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/assets/img');

var studentSchema = mongoose.Schema({
    hodId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'hod',
        required : true
    },
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'teacher',
        required : true
    },
    name : {
        type : String,
        required : true
    },
    fathername : {
        type : String,
        required : true
    },
    mothername : {
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
    address : {
        type : String,
        required : true
    },
    per : {
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
})

studentSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
studentSchema.statics.avatarPath = AVATAR_PATH;

var student = mongoose.model('student', studentSchema);

module.exports = student;