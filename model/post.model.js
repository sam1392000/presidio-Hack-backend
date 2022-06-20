const mongoose = require('mongoose')
const {Schema} = mongoose;

const postSchema = new Schema({
    postUrl:{
        type:String
    },
    description:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[String],
    likes:[{type:Schema.Types.ObjectId,ref:"User"}],
    accessibility:{
        type:String,
        enum:['private','public'],
        default:'public'
    }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)