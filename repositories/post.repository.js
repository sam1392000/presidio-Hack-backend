const AWS = require('aws-sdk');
const fs = require('fs');
const Post = require('../model/post.model');
const RESPONSE_TYPE = require('../utilities/responseTypes');
const s3 = new AWS.S3({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
});

exports.savePostRepo = async (res,{fields,files}) => {
    const {description,user,accessibility} = fields;
    const postModel = new Post(fields);
    if(files.post){
        const imagePath = files.post.filepath;
        const blob = fs.readFileSync(imagePath);
        const uploadedImage = await s3.upload({
            Bucket:process.env.BUCKET_NAME,
            Key:'posts/'+files.post.originalFilename,
            Body:blob
        }).promise()
        if(uploadedImage.Location){
            postModel.postUrl = uploadedImage.Location;
        }
    }
    postModel.save((err,data) => {
        if(err)
            return RESPONSE_TYPE._400(res,"Post cannot be uploaded...");
        return RESPONSE_TYPE._200(res,data);
    })
}

exports.getSinglePost = (res,id) => {
    Post
        .findById(id)
        .populate("comments")
        // .populate("user")
        .exec()
        .then(post => {
            return RESPONSE_TYPE._200(res,post)
        })
        .catch(err => {
            return RESPONSE_TYPE._400(res,"No post with this id");
        })

exports.likePost = async (res,data) => {
  
    await Post.findByIdAndUpdate(
        {_id:data.postid},
        {$push:{"likes":data.userid}},
        { new: true, useFindAndModify: false },
        (err,data) => {
            if(err){
                return RESPONSE_TYPE._400(res,{'status':err})
            }
            else
            {
             return RESPONSE_TYPE._200(res, {'bod':data});
            }          
        }
    )
    

}