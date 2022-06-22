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
             .populate("user")
             .where('user').in(following_String)             
             .exec()
             .then(data => {
                  return RESPONSE_TYPE._200(res,data);
                             

             }).catch(err => {
                 return RESPONSE_TYPE._400(res,"No Story...")
             })
     
 
 }
 exports.deleteStory = async (res,data) => {
    Story.findAndModify(
        {
          query: { user: data},
          remove: true
        }
     ).exec().then(data => {
         return RESPONSE_TYPE._200(res,"deleted successfully")
     }).catch(err => {
        return RESPONSE_TYPE._400(res,"No Story...")
    })
    }