const mongoose = require('mongoose')
const {Schema} = mongoose;

const postSchema = new Schema({
    postUrl:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[{type:Schema.Types.ObjectId,ref:"Comment"}],
    likes:[{type:Schema.Types.ObjectId,ref:"User"}],
    accessibility:{
        type:String,
        enum:['private','public'],
        default:'public'
    }
},{timestamps:true})



module.exports = mongoose.model("Post",postSchema)