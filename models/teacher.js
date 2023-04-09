var mongoose = require('mongoose');
const multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/assets/img');

var teacherSchema = mongoose.Schema({
    hodId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'hod',
        required : true
    },
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
    age : {
        type : Number,
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
    experience : {
        type : String,
        required :true
    },
    subject : {
        type : String,
        required :true
    },
    avatar : {
        type : String,
        required :true
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

teacherSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
teacherSchema.statics.avatarPath = AVATAR_PATH;

var teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;