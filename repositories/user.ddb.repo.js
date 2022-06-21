const User = require("../model/user.model");
const Post = require("../model/post.model");
const RESPONSE_TYPE = require("../utilities/responseTypes");
const AWS = require('aws-sdk')
const fs = require('fs');

AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({
    accessKeyId: process.env.SECRET_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY_ID
});
var docClient = new AWS.DynamoDB.DocumentClient();
exports.getUserFromDB = (req,data) => {
    var params = {
        TableName: 'Users',
        Key: {
          'id': {N: data}
        },
      
      };
      ddb.getItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item.name);
        }
      });
}
exports.addUserToDB = (res,data) => {
    console.log(data.body.desc)
    var params = {
        TableName: 'Users',
        Item: {
          'id' : {N:''+ 3},
          'desc' : {S: ''+data.body.desc},
          'emailid':{S: ""+data.body.email},
          'name':{S:""+data.body.name},
          'profilepic':{S:"https://presidio-hack-172022.s3.amazonaws.com/profile_pic/eight.png"},
          'userid': {N:''+2}
        }
      };
      
     
      ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        }
        else 
        {          
            return RESPONSE_TYPE._200(res,data)
        }
      });
    }

exports.followUser = async (res,data) => {
    const tofollow = data.body.tofollow
    const userid =data.body.userid
    var params = {
        TableName: 'Users',
        Item: {
          'id' : {N:''+ userid},
          'following':{L:[{S :tofollow}]},
        }
      };
      
     
       ddb.putItem(params, function(err, dat) {
        if (err) {
          console.log("Error", err);
        }
        else 
        {    
           
            this.followingUser(res,{userid:tofollow ,tofollow:userid } )      
         
        }
      })

          
        
         
    
    }

    exports.followingUser = async (res,data) => {
       console.log(data)
       const tofollow=data.tofollow
        var params = {
            TableName: 'Users',
            Item: {
              'id' : {N:''+ data.userid},
              'following':{L:[{S :tofollow}]},
            }
          };
          
         
          await ddb.putItem(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            }
            else 
            {          
              return RESPONSE_TYPE._200(res,data)
            }
          }).promise();
         
             
        
        }
    