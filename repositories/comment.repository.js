const Post = require('../model/post.model');
const Comment = require('../model/comments.model')
const RESPONSE_TYPE = require('../utilities/responseTypes');

exports.saveComments = async (res,data) => {
    const comment = new Comment(data);
    await comment.save((err,data) => {
        if(err)
            return RESPONSE_TYPE._400(res,"cannot post comment");
        if(data._id)
            this.updateInUserPostProfile(res,data);
    })
}

exports.updateInUserPostProfile = (res,dataComment) =>{
    const {_id , post} = dataComment;
    Post.findByIdAndUpdate(
        {_id:post},
        {$push:{comments:_id}},
        { new: true, useFindAndModify: false },
        (err,data) => {
            if(err)
                return RESPONSE_TYPE._400(res,"Something went wrong");
            return RESPONSE_TYPE._200(res,dataComment);
        }
    ).clone()
}