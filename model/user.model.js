const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        default:"https://freesvg.org/img/abstract-user-flat-4.png"
    },
    description:{
        type:String,
        default:""
    },
    followers:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    following:[{type: Schema.Types.ObjectId, ref: 'User'}],
   
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);