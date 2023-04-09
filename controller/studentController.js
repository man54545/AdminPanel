var student = require('../models/student');
var hod = require('../models/hod');
var teacher = require('../models/teacher');
var fs = require('fs');
var path = require('path');
const { log } = require('console');

module.exports.insertStudent = async (req,res) => {
    var hodData = await hod.find({});
    var teacherData = await teacher.find({});
    return res.render('insert_student', {
        hod : hodData,
        teacher : teacherData
    });
}

module.exports.addStudentData = async (req,res) => {
    if(req.file){
        var imgPath = student.avatarPath+"/"+req.file.filename;
    }
    req.body.avatar = imgPath;
    req.body.status = 'true';
    var studentData = await student.create(req.body);
    if (studentData) {
        return res.redirect('back');
    } else {
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.activeStudent = async (req,res) => {
    var page = 1;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var per_page = 5;
    var data = await student.find({status : true,
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('hodId').populate('teacherId').skip((page - 1) * per_page).limit(per_page).exec();
    var count = await student.find({status : true, 
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('active_student', {
        active : data,
        search : search,
        per_page : per_page,
        count : count,
        total : Math.ceil(count/per_page),
        curr : page,
        prev : page - 1,
        next : page + 1
    });
}

module.exports.deactiveStudent = async (req,res) => {
    var page = 1;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var per_page = 5;
    var data = await student.find({status : false,
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('hodId').populate('teacherId').skip((page - 1) * per_page).limit(per_page).exec();
    var count = await student.count({status : false,
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    });
    return res.render('deactive_student', {
        deactive : data,
        search : search,
        per_page : per_page,
        count : count,
        total : Math.ceil(count/per_page),
        curr : page,
        prev : page - 1,
        next : page + 1
    });
}

module.exports.deleteData = async (req,res) => {
    var studentData = await student.findById(req.params.id);
    if(studentData.avatar)
    {
        fs.unlinkSync(path.join(__dirname,"..",studentData.avatar));
    }
    var data = await student.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    var hodData = await hod.find({});
    var data = await student.findById(req.params.id).populate('hodId').populate('teacherId').exec();
    var teacherData = await teacher.find({hodId : data.hodId});
    if(data){
        return res.render('update_student', {
            student : data,
            hod : hodData,
            teacher : teacherData
        });
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.editData = async (req,res) => {
    if(req.file){
        var studentData = await student.findById(req.body.editId);
        console.log(studentData.avatar);
        if(studentData.avatar){
            fs.unlinkSync(path.join(__dirname,"..",studentData.avatar));
        }
        var imgPath = student.avatarPath+"/"+req.file.filename;
        req.body.avatar = imgPath;
        req.body.status = true;
        var data = await student.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            return res.redirect('activeStudent');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
    else{
        var data = await student.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            // console.log(data.avatar);
            return res.redirect('activeStudent');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
}

module.exports.deActive = async (req,res) => {
    var data = await student.findByIdAndUpdate(req.params.id, {
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
    var data = await student.findByIdAndUpdate(req.params.id, {
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

module.exports.getTeacherData = async (req,res)  => {
    var teacherData = await teacher.find({hodId : req.body.hodId});
    if(teacherData){
        return res.render('getteacherdata', {
            opt : teacherData
        })
    }
}
