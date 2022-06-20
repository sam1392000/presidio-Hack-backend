const mongoose = require('mongoose')
const {Schema} = mongoose;

const commentSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
  
},{timestamps:true})



module.exports = mongoose.model("Comment",commentSchema)