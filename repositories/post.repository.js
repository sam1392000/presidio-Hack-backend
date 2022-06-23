const AWS = require('aws-sdk');
const fs = require('fs');
const Post = require('../model/post.model');
const RESPONSE_TYPE = require('../utilities/responseTypes');
const Comment = require('../model/comments.model');
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
            post.populate("user").then(data => {
                const fullData = {
                    commentCount:data.comments.length,
                    data:[],
                    likeCount:data.likes.length
                }                
                return RESPONSE_TYPE._200(res,fullData);
            })
            .catch(err => {
                return RESPONSE_TYPE._400(res,"No use")
            })
           
        })
        .catch(err => {
            return RESPONSE_TYPE._400(res,err);
        })


}

exports.getCommentsWithNameRepo = (res,dataId) => {
    Comment
        .find({'post':dataId})
        .populate('user','_id name profilepic')
        .populate('post','postUrl description accessibility comments likes')
        .then(data => {
            // console.log(data[0].post.comments.length);
            // console.log(data[0].post.likes.length);
            console.log(data);
            if(data.length > 0){
                const fullPost = {
                    commentCount:data[0].post.comments.length,
                    likeCount:data[0].post.likes.length,
                    data:data
                }
                fullPost.data[0].post.comments = undefined;
                fullPost.data[0].post.likes = undefined;
                return RESPONSE_TYPE._200(res,fullPost);
            }else{
                return this.getSinglePost(res,dataId);
            }
           
        })
        .catch(err => {
            console.log(err)
            return RESPONSE_TYPE._400(res,"No use..")
        })
}

// '_id name profilepic comment likes'

//'postUrl description accessibility'