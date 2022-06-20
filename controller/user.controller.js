const formidable = require('formidable')
const RESPONSE_TYPE = require('../utilities/responseTypes');
const { addUser, updateProfile, addProfilePic, followUser , followersFunction} = require("../repositories/user.repository");


exports.registerUser = (req,res) => {
    var form = new formidable.IncomingForm();
    form.parse(req , (err,fields,files) => {
        if(err){
            return RESPONSE_TYPE._400(res,err);
        }

        if(!fields){
            return RESPONSE_TYPE._400("Can not create Profile")
        }
        return addUser(res,fields);
    })
}

exports.updateProfile = (req,res) => {
    if(!req.body){
        return RESPONSE_TYPE._400(res,"Nothing Was Updated...");
    }
    return updateProfile(res,req.body);
}

exports.uploadProfilePic =  (req,res) => {
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        if(err)
            return RESPONSE_TYPE._400(res,"Profile pic cannot be uploaded...");
        // return RESPONSE_TYPE._200(res,fields)
        if(!fileds || !files)
            return RESPONSE_TYPE._400(res,"Please upload image for profile picture")
        return addProfilePic(res,files,fields.id)     
    })
}

// TODO

exports.followUser = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    return followUser(res,req.body)
    // console.log(data.status);
    
}