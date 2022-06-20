const { saveComments } = require('../repositories/comment.repository');
const RESPONSE_TYPE = require('../utilities/responseTypes');
exports.addComments = (req,res) => {
    const {user,post,comment}= req.body;
    if(!user || !post || !comment)
        return RESPONSE_TYPE._400(res,"Can not comment");
    return saveComments(res,req.body);
}