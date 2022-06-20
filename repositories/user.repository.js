const User = require("../model/user.model");
const RESPONSE_TYPE = require("../utilities/responseTypes");
const AWS = require('aws-sdk')
const fs = require('fs');
const s3 = new AWS.S3({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
})
exports.addUser = (res,data) => {
    const user = new User(data);
    user.save((err,data) => {
        if(err){
            return RESPONSE_TYPE._400(res,"Profile Not Created...");
        }
        return RESPONSE_TYPE._200(res,data)
    })
}

exports.updateProfile = (res,data) => {
    User.findByIdAndUpdate(
        {_id:data._id},
        { $set: data },
        { new: true, useFindAndModify: false },
        (err,user) => {
            if(err)
                return RESPONSE_TYPE._400(res,"Profile Cannot be updated id doesnt exist")
            return RESPONSE_TYPE._200(res,user)
        }
        )
}

exports.addProfilePic = async (res , data , id) => {
    const imagePath = data.profilepic.filepath
    const blob = fs.readFileSync(imagePath);
    const uploadedImage = await s3.upload({
        Bucket:process.env.BUCKET_NAME,
        Key:'profile_pic/'+data.profilepic.originalFilename,
        Body:blob
    }).promise()
    if(uploadedImage.Location){
       return this.updateProfile(res,{_id:id,profilepic:uploadedImage.Location})
    }
    return RESPONSE_TYPE._400(res,"Profile Picture cannot be updated...")
}

// TODO
exports.followUser = async (res,data) => {
    // return {'status':true}
    await User.findByIdAndUpdate(
        {_id:data.userId},
        {$set:{"following":data.tofollow}},
        { new: true, useFindAndModify: false },
        (err,data) => {
            if(err){
                return {'status':false}
            }else{
                this.followersFunction(res,{userId:req.body.tofollow , tofollow:req.body.userId})
            }
        }

    )
}

exports.followersFunction =  async(res,data) => {
   await User.findByIdAndUpdate(
       {_id:data.userId},
       {$set:{"followers":data.tofollow}},
       { new: true, useFindAndModify: false },
       (err,data) => {
           if(err){
               return RESPONSE_TYPE._400(res,{'status':err})
           }
           return RESPONSE_TYPE._200(res,{'status':true});
       }

   )
}