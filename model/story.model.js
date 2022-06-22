const mongoose = require('mongoose')
const {Schema} = mongoose;

const storySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    storyUrl:{
        type:String,
        required:true
    }
},{timestamps:true});
storySchema.index({createdAt: 1},{expireAfterSeconds: 180});
module.exports = mongoose.model('Story',storySchema);
