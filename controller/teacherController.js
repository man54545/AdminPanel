var teacher = require('../models/teacher');
var hod = require('../models/hod');
var student = require('../models/student');
var path = require('path');
var fs = require('fs');

module.exports.insertTeacher = async (req,res) => {
    var data = await hod.find({});
    return res.render('insert_teacher', {
        hod : data
    });
}

module.exports.addTeacherData = async (req,res) => {
    if(req.file){
        var imgPath = teacher.avatarPath+"/"+req.file.filename;
    }
    req.body.avatar = imgPath;
    req.body.status = 'true';
    var teacherData = await teacher.create(req.body);
    if (teacherData) {
        return res.redirect('back');
    } else {
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.activeTeacher = async (req,res) => {
    var page = 1;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var per_page = 8;
    // var data = await teacher.aggregate([
    //     {$sort : {name : 1}},
    //     {$lookup:{
    //         from:'hods',
    //         localField:'hodId',
    //         foreignField:'_id',
    //         as:'hodData',
    //     }}
    // ]).skip((page - 1) * per_page).limit(per_page).exec();
    var data = await teacher.find({status : true, 
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('hodId').skip((page - 1) * per_page).limit(per_page).exec();
    var count = await teacher.find({status : true, 
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('active_teacher', {
        search : search,
        active : data,
        per_page : per_page,
        count : count,
        total : Math.ceil(count/per_page),
        prev : page-1,
        next : page+1,
        curr : page
    });
}

module.exports.deactiveTeacher = async (req,res) => {
    var page = 1;
    var search = '';
    if(req.query.page){
        page = JSON.parse(req.query.page);
    }
    if(req.query.search){
        search = req.query.search;
    }
    var per_page = 8;
    var data = await teacher.find({status : false, 
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).populate('hodId').skip((page - 1) * per_page).limit(per_page).exec();
    var count = await teacher.find({status : false, 
        $or : [
            {name : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('deactive_teacher', {
        search : search,
        deactive : data,
        per_page : per_page,
        count : count,
        total : Math.ceil(count/per_page),
        prev : page-1,
        next : page+1,
        curr : page
    });
}

module.exports.deleteData = async (req,res) => {
    var teacherData = await teacher.findById(req.params.id);
    if(teacherData.avatar)
    {
        fs.unlinkSync(path.join(__dirname,"..",teacherData.avatar));
    }
    var data = await teacher.findByIdAndDelete(req.params.id);
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
    var data = await teacher.findById(req.params.id);
    if(data){
        return res.render('update_teacher', {
            teacher : data,
            hod : hodData
        });
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.editData = async (req,res) => {
    if(req.file){
        var teacherData = await teacher.findById(req.body.editId);
        if(teacherData.avatar){
            fs.unlinkSync(path.join(__dirname,"..",teacherData.avatar));
        }
        var imgPath = teacher.avatarPath+"/"+req.file.filename;
        req.body.avatar = imgPath;
        var data = await teacher.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            return res.redirect('activeTeacher');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
    else{
        var data = await teacher.findByIdAndUpdate(req.body.editId, req.body);
        if(data)
        {
            return res.redirect('activeTeacher');
        }
        else{
            console.log("Something Wrong.");
            return res.redirect('back');
        }
    }
}

module.exports.deActive = async (req,res) => {
    var data = await teacher.findByIdAndUpdate(req.params.id, {
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
    var data = await teacher.findByIdAndUpdate(req.params.id, {
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

module.exports.viewStudent = async (req,res) => {
    var data = await student.find({teacherId : req.params.id}).populate('hodId').populate('teacherId').exec();
    if(data)
    {
        return res.render('view_student', {
            student : data
        });
    }
    else{
        return res.redirect('back');
    }
}