const formidable = require('formidable')
const RESPONSE_TYPE = require('../utilities/responseTypes');
const { addUser, updateProfile, addProfilePic, followUser , followersFunction,profieDesc,Homefeed,getSingleUser} = require("../repositories/user.repository");
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
});

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
     followUser(res,req.body).then(data => {
        if(data.status == true){
            return followersFunction(res,{userId:req.body.tofollow , tofollow:req.body.userId})
        }else{
            return RESPONSE_TYPE._400(res,"User Not mentioned");
        }
     })
    // console.log(data.status);
    
}
exports.profileDesc = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    console.log(req.params.id);
    return profieDesc(res,req.params.id);

    // console.log(data.status);
    
}
exports.Home = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    // console.log(req.params.id);
    return Homefeed(res,req.params.id);

    // console.log(data.status);
    
}

exports.getSingleUser = (req,res) => {
    let value = req.params.name;
    if(!value)
        return RESPONSE_TYPE._400(res,"no query param..")
    return getSingleUser(res,value);
}

exports.getUserFromDB = (req,res) => {
    var params = {
        TableName: 'Users',
        Key: {
          'id': {N: '1'}
        },
       // ProjectionExpression: 'ATTRIBUTE_NAME'
      };

      ddb.getItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item.name);
        }
      });
}