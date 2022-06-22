const AWS = require('aws-sdk');
const fs = require('fs');
const Post = require('../model/post.model');
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
        await Post
             .find({ projection: { postUrl: 1,accessibility:1,comments:1,likes:1,description:1,emailid:0,followers:0,following:0,userid:0} })
             .populate("user")
             .where('user').in(following_String)
             .exec()
             .then(data => {
                return RESPONSE_TYPE._200(res,data);
             }).catch(err => {
                 return RESPONSE_TYPE._400(res,"No Post...")
             })
     
 
 }
  