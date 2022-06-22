const AWS = require('aws-sdk');
const fs = require('fs');
const Story = require('../model/story.model');
const User = require('../model/user.model');


const RESPONSE_TYPE = require('../utilities/responseTypes');
const s3 = new AWS.S3({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
});


exports.getStory = async (res,data) => {
    await User
         .findById(data)
         .exec()
         .then(data => {
             // console.log(data.following)
             console.log(data)
            return this.findFollowersStory(res,data.following);
         })
         .catch(err => {
             return RESPONSE_TYPE._400(res,"No user with this id");
         })
 }
 
 exports.findFollowersStory = async (res,following) => {
     var following_String = [];
     await following.map(data => {
         following_String.push(data.toString());
     })
        await Story
             .find()
             .populate("user","_id name")
             .where('user').in(following_String)             
             .exec()
             .then(data => {
                  return RESPONSE_TYPE._200(res,data);
                             

             }).catch(err => {
                 return RESPONSE_TYPE._400(res,"No Story...")
             })
     
 
 }

  
exports.addStoryToDb = async (res,fields,files) => {
    const storymodel = new Story(fields);
    if(files.story){
        const imagePath = files.story.filepath;
        const blob = fs.readFileSync(imagePath);
        const uploadedImage = await s3.upload({
            Bucket:process.env.BUCKET_NAME,
            Key:'stories/'+files.story.originalFilename,
            Body:blob
        }).promise()
        if(uploadedImage.Location){
            storymodel.storyUrl = uploadedImage.Location;
        }
        storymodel.save((err,data) => {
            if(err)
                return RESPONSE_TYPE._400(res,"Story Not Saved");
            return RESPONSE_TYPE._200(res,data);
        })
    }
    else{
        return RESPONSE_TYPE._400(res,"Story was not uploaded");
    }
}

 exports.deleteStory = async (res,data) => {
   await Story.findOneAndDelete(
        
           { user: data.userid,_id:data.storyid},
         
        
     ).exec().then((data) => {
         console.log(data)
         return RESPONSE_TYPE._200(res,"deleted successfully")
     }).catch(err => {
        return RESPONSE_TYPE._400(res,"No Story...")
    })
    }

