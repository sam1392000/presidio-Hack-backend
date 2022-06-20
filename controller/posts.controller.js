const formidable = require('formidable');
const { savePostRepo,likePost } = require('../repositories/post.repository');
const RESPONSE_TYPE = require('../utilities/responseTypes');
exports.savePost = (req,res) => {
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        if(err)
            return RESPONSE_TYPE._400(res,"cant not be posted..");
        // return RESPONSE_TYPE._200(res,{fields,files})
        return savePostRepo(res,{fields,files});
    })
}
exports.likePost = (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"no proper post");
    
    return likePost(res,req.body);
}