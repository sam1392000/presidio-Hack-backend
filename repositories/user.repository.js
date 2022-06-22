const User = require("../model/user.model");
const Post = require("../model/post.model");
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

    console.log(data)
    const fo=data.tofollow
  
    await User.findByIdAndUpdate(
        {_id:data.userId},
        {$push: { following: fo }},
        { new: true, useFindAndModify: false },
        (err,data) => {
            if(err){
                return {'status':false}
            }else{
                 this.followersFunction(res,{userId: fo , tofollow:data._id})
            }
        }

     )
}

exports.followersFunction =  async(res,data) => {
        console.log(data)
        await User.findByIdAndUpdate(
       {_id:data.userId},
       {$push:{"followers":data.tofollow}},
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

exports.profieDesc =  async(res,data) => {
     User.findById(data).populate("following").populate("followers").exec((err,data)=>{
         if(err)
         {
            return RESPONSE_TYPE._400(res,err)
         }
         else
           {
            return RESPONSE_TYPE._200(res,data);
           }   
     })
}

// exports.Homefeed =  async(res,data) => {
//     let post = [];
//     await User.findById(data).exec((err,data)=>{
//         if(err)
//         {
//            return RESPONSE_TYPE._400(res,err)
//         }
//         else
//           {
//             const following =data.following
//             console.log(following.length);
//             following.forEach( async element => {
//                   await this.HomefeedPosts(res,element).then( val => {
//                     console.log(val)
//                     post.concat(val);
//                     //return RESPONSE_TYPE._200(res,val);
//                  })
//               });
//               //post.push(2)
//             // console.log("Post "+post)
//            return RESPONSE_TYPE._200(res,post);
//           }   
//     })
// }

// exports.HomefeedPosts =  async(res,data) => {
//    return Post
//     .find({user:data},{ projection: { postUrl: 1,accessibility:1,comments:1,likes:1,description:1} })
//     .populate("user")
//     .exec()
//     .then(data => {
//         return data;
//     })
//     .catch(err => {
//         return RESPONSE_TYPE._400(res,"Error");
//     })
    
// }

exports.Homefeed = async (res,data) => {
   await User
        .findById(data)
        .exec()
        .then(data => {
            // console.log(data.following)
           return this.findFollowersPost(res,data.following);
        })
        .catch(err => {
            return RESPONSE_TYPE._400(res,"No user with this id");
        })
}

exports.findFollowersPost = async (res,following) => {
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
 
exports.getSingleUser = (res,value) => {
    User
        .find({"name":{'$regex':'^'+value,$options:'i'}})
        .exec()
        .then(data => {
            return RESPONSE_TYPE._200(res,data)
        }) 
        .catch(err => {
            return RESPONSE_TYPE._400(res,"No user with this name")
        })
}



// exports.Homefeed =  async(res,data) => {
//     User.findById(data).exec((err,data)=>{
//         if(err)
//         {
//            return RESPONSE_TYPE._400(res,err)
//         }
//         else
//           {
//             const following =data.following
          
//             following.forEach(element => {
               
//                  this.HomefeedPosts(res,element);
//               });
//               return RESPONSE_TYPE._200(res,data)
          
//           }   
//     })
// }

// exports.HomefeedPosts =  async(res,data) => {
//  Post.find({"accessibility":"private",user:data},function(err, result) {
//     if (err) throw err;
    
//     if(Object.entries(result).length !== 0){
//       console.log(result);
//     }
//  }).populate("user")
// }

exports.publicPosts =  async(res,data) => {

    Post.find({"accessibility":"public","postUrl":{$ne:" "}},function(err, result) {
       if (err) throw err;

        console.log(result);
         return RESPONSE_TYPE._200(res,result);
       
    })
   }
exports.selfPosts =  async(res,data) => {
   
    Post.find({user:data}).populate("user").exec((err,data)=>{
                if(err)
                {
                   return RESPONSE_TYPE._400(res,err)
                }
                else
                  { 
                      const resp={
                          followersLength : data[0].user.followers.length,
                          followingLength : data[0].user.following.length,
                          posts:data.length,                
                          actualdata:data
                      }
                      console.log(resp)
                    return RESPONSE_TYPE._200(res,resp)
                  }

   })
}
exports.selfPostslen =  async(res,data) => {
   
    const length=Post.find({user:data})


   }


exports.likepost =  async(res,data) => {

   const val= await Post.find({_id:data.postid, likes: {"$in": [data.userid]}});
    
    if(val.length === 0)
    {
      
        Post.findByIdAndUpdate(
    {_id:data.postid},
    
    
      {$push:{"likes":data.userid}},
  
    { new: true, useFindAndModify: false },
    (err,data) => {
        if(err){
            return RESPONSE_TYPE._400(res,{'status':err})
        }
        else
        {
            console.log("Like ..."+data);
         return RESPONSE_TYPE._200(res, {'bod':data});
        }          
    }
).clone();
    }
else{
 Post.findByIdAndUpdate(
    {_id:data.postid},    
    {$pull:{"likes":data.userid}},
    { new: true, useFindAndModify: false },
    (err,data) => {
        if(err){
           
            return RESPONSE_TYPE._400(res,{'status':err})
        }
        else
        {
            console.log("Dislike ..."+data);
         return RESPONSE_TYPE._200(res, {'bod':data});
        }          
    }
).clone();
}
}
