var hod = require('../models/hod');
var teacher = require('../models/teacher');
var nodeMailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
const { log } = require('console');

module.exports.insertHod = (req,res) => {
    return res.render('insert_hod');
}

module.exports.addHodData = async (req,res) => {
    if(req.file){
        var imgPath = hod.avatarPath+"/"+req.file.filename;
    }
    req.body.avatar = imgPath;
    req.body.status = 'true';
    var hodData = await hod.create(req.body);
    if (hodData) {
        return res.redirect('back');
    } else {
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.activeHod = async (req,res) => {
    var data = await hod.find({status : true});
    return res.render('active_hod', {
        'active' : data
    });
}

module.exports.deactiveHod = async (req,res) => {
    var data = await hod.find({status : false});
    return res.render('deactive_hod',{
        'deactive' : data
    });
}

module.exports.deleteData = async (req,res) => {
    var hodData = await hod.findById(req.params.id);
    if(hodData.avatar)
    {
        fs.unlinkSync(path.join(__dirname,"..",hodData.avatar));
    }
    var data = await hod.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    var data = await hod.findById(req.params.id);
    if(data){
        return res.render('update_hod', {
            hod : data
        });
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.editData = async (req,res) => {
    if(req.file){
        var hodData = await hod.findById(req.body.editId);
        if(hodData.avatar){
            fs.unlinkSync(path.join(__dirname,"..",hodData.avatar));
        }
        var imgPath = hod.avatarPath+"/"+req.file.filename;
        req.body.avatar = imgPath;
        var data = await hod.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            return res.redirect('activehod');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
    else{
        var data = await hod.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            return res.redirect('activehod');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
}

module.exports.deActive = async (req,res) => {
    var data = await hod.findByIdAndUpdate(req.params.id, {
        status : false
    });
    if(data)
    {
        return res.redirect('back');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.Active = async (req,res) => {
    var data = await hod.findByIdAndUpdate(req.params.id, {
        status : true
    });
    if(data)
    {
        return res.redirect('back');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.viewTeacher = async (req,res) => {
    var data = await teacher.find({hodId : req.params.id}).populate('hodId').exec();
    console.log(data);
    return res.render('view_teacher', {
        teacher : data
    });
}

module.exports.sendMail = (req,res) => {
    return res.render('mail', {
        id : req.params.id
    });
}

module.exports.MailData = async (req,res) => {
    var data = await hod.findById(req.body.id);
    if (data) {
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
            subject: req.body.topic,
            html:"<h3>Topic :- </h3><h2>"+req.body.topic+"</h2><br><h3>Description :- </h3>"+req.body.description+`<img src='${req.body.file}' width='300px'>`,
        });
        return res.redirect('back');
    } else {
        return res.redirect('back');
    }
}