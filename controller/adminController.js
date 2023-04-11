const principal = require('../models/principal');
const hod = require('../models/hod');
const teacher = require('../models/teacher');
const student = require('../models/student');
var nodeMailer = require('nodemailer');

module.exports.Main = async (req,res) => {
    var data = await hod.find({status : true});
    var data2 = await teacher.find({status : true});
    return res.render('main', { 
        hod : data,
        teacher : data2,
        user : req.user
    });
}

module.exports.Dashboard = async (req,res) => {
    var hodData = await hod.count();
    var teacherData = await teacher.count();
    var studentData = await student.count();
    return res.render('dashboard', {
        data : req.user,
        hod : hodData,
        teacher : teacherData,
        student : studentData,
    });
}

module.exports.register = (req,res) => {
    return res.render('register');
}

module.exports.registerProcess = async (req,res) => {
    req.body.gender = 'null';
    req.body.phone = 'null';
    req.body.dob = 'null';
    req.body.status = true;
    var data = await principal.create(req.body);
    if(data)
    {
        return res.redirect('login');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.login = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/Dashboard');
    }
    return res.render('login');
}

// module.exports.loginProcess = async (req,res) => {
//     var hodData = await hod.count();
//     var teacherData = await teacher.count();
//     var studentData = await student.count();
//     return res.render('dashboard', {
//         data : req.user,
//         hod : hodData,
//         teacher : teacherData,
//         student : studentData,
//     });
// }

module.exports.viewProfile = async (req,res) => {
    if(req.query.teacherId){
        var data = await teacher.findById(req.query.teacherId).populate('hodId').exec();
        return res.render('view_profile', {
            data : data,
            teacherId : req.query.teacherId,
            studentId : req.query.studentId,
        });
    }
    if(req.query.studentId){
        var data = await student.findById(req.query.studentId).populate('hodId').populate('teacherId').exec();
        return res.render('view_profile', {
            data : data,
            studentId : req.query.studentId,
            teacherId : req.query.teacherId,
        });
    }
}

module.exports.loginViewProfile = (req,res) => {
    return res.render('view_profile_login', { 
        data : req.user
    });
}

module.exports.hodProfile = async (req,res) => {
    if(req.query.hodId){
        var data = await hod.findById(req.query.hodId);
        return res.render('view_profile_hod', {
            data : data,
            hodId : req.query.hodId,
        });
    }
}

module.exports.lostPass = (req,res) => {
    return res.render('lostpass');
}

module.exports.LostPass = async (req,res) => {
    var data = await principal.findOne({email : req.body.email});
    if (data) {
        var otp = Math.ceil(Math.random()*10000);
        var transport = nodeMailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "bc51121a6e09e0",
              pass: "bdb94c32a37314"
            }
        });
        let info = await transport.sendMail({
            from: 'sakadasariyaman5@gmail.com',
            to: data.email,
            subject: "Hello ✔", 
            text: "Hello world?", 
            html: `<b>Hello world OTP : ${otp}</b>`,
        });
        res.cookie('otp',otp);
        res.cookie('email',req.body.email);
        return res.redirect('optPage');
    } else {
        return res.redirect('back');
    }
}

module.exports.optPage = (req,res) => {
    return res.render('otp_page');
}

module.exports.checkOtp = (req,res) => {
    if(req.cookies.otp == req.body.otp){
        return res.redirect('genrateNewpass');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.genrateNewpass = (req,res) =>{
    return res.render('genrate_newpass');
}

module.exports.checkNewPass = async (req,res) => {
    if (req.body.password == req.body.cpassword) {
        var emailData = await principal.findOne({email : req.cookies.email});
        var data = await principal.findByIdAndUpdate(emailData.id, {
           password : req.body.password 
        });
        return res.redirect('login');     
    } else {
        return res.redirect('back');
    }
}


module.exports.changePass = (req,res) => {
    return res.render('change_pass', {
        data : req.user
    });
}

module.exports.newPass = async (req,res) => {
    var data = await principal.findOne({email : req.body.email});
    if(data.password == req.body.opassword){
        if(req.body.npassword == req.body.cpassword){
            var pass = await principal.findByIdAndUpdate(data.id, {
                password : req.body.npassword
            });
            if(pass){
                return res.redirect('logOut');
            }
            else{
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    }
}

// module.exports.loginStudent = async (req,res) => {
//     return res.render('login_student');
// }

// module.exports.loginStu = async (req,res) => {
//     var data = await student.findOne({email : req.body.email});
//     if(data){
//         res.cookie('std',data);
//         return res.redirect('/');
//     }
//     else {
//         return res.redirect('back');
//     }
// }

module.exports.viewTeacherData = async (req,res) => {
    var data1 = await hod.findById(req.params.id);
    var data = await teacher.find({hodId : req.params.id}).populate('hodId').exec();
    return res.render('teacher_data', { 
        teacher : data,
        hod : data1
    });
}