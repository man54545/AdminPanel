var principal = require('../models/principal');

module.exports.insertPrincipal = (req,res) => {
    return res.render('insert_principal');
}

module.exports.viewPrincipal = async (req,res) => {
    var data = await principal.find({});
    return res.render('view_principal', {
        principal : data
    });
}

module.exports.addPrincipalData = async (req,res) => {
    req.body.status = 'true';
    var principalData = await principal.create(req.body);
    if (principalData) {
        return res.redirect('back');
    } else {
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.deleteData = async (req,res) => {
    var data = await principal.findByIdAndDelete(req.params.id);
    if(data){
        return res.redirect('back');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.updateData = async (req,res) => {
    var data = await principal.findById(req.params.id);
    if(data){
        return res.render('update_principal', {
            principal : data
        });
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}

module.exports.editData = async (req,res) => {
    var data = await principal.findByIdAndUpdate(req.body.editId, req.body);
    if(data)
    {
        return res.redirect('viewPrincipal');
    }
    else{
        console.log("Something Wrong.");
        return res.redirect('back');
    }
}
