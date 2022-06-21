var AWS = require('aws-sdk');
// const Post = require('../model/post.model')
const fs = require('fs')
AWS.config.update({region: 'us-east-1'});
const { v4: uuidv4 } = require('uuid');
const RESPONSE_TYPE = require('../utilities/responseTypes');
var ddb = new AWS.DynamoDB({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
})
const s3 = new AWS.S3({
  accessKeyId: process.env.SECRET_KEY_ID,
  secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
});
exports.savePostToDbbRepo = async (res,{fields,files}) => {
   // const postModel = new Post(fields);
    
    let value = "";
    if(files.post){
        const imagePath = files.post.filepath;
        const blob = fs.readFileSync(imagePath);
        const uploadedImage = await s3.upload({
            Bucket:process.env.BUCKET_NAME,
            Key:'posts/'+files.post.originalFilename,
            Body:blob
        }).promise()
        if(uploadedImage.Location){
            value = uploadedImage.Location;
        }
    }
   
    var params = {
        TableName: 'Post',
        Item: {
          'id' : {S: ''+uuidv4() },
          'accessebility' : {S: ''+fields.accessebility},
          'desc':{S:''+fields.desc},
          'posturl':{S:''+value},
          'user':{S:''+fields.user}
        }
      };
      
      // Call DynamoDB to add the item to the table
      await ddb.putItem(params, function(err, data) {
        if (err) {
         return RESPONSE_TYPE._400(res,err)
        } else {
          // return RESPONSE_TYPE._200(res,data)
          console.log(data)
          return RESPONSE_TYPE._200(res,value);
        }
      });
      
}

exports.getSinglePostDdb = async (res,data) => {
  console.log(data);
    var params = {
        TableName: 'Posts',
        Key: {
          'id': {S: "1"}
        },
      
      };
      ddb.getItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          return RESPONSE_TYPE._200(res,data);
        }
      });
}