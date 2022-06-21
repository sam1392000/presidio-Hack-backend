const formidable = require('formidable');

const { savePostRepo , getSinglePost } = require('../repositories/post.repository');
const { likePost } = require('../repositories/post.repository');

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


exports.getPost = (req,res) =>{
    const id = req.params.id;
    if(!id)
        return RESPONSE_TYPE._400(res,"No id found")
   return getSinglePost(res,id)
}

exports.likePost = (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"no proper post");
    
    return likePost(res,req.body);

}