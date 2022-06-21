const formidable = require('formidable');
const { savePostToDbbRepo,getSinglePostDdb } = require('../repositories/post.ddb.respository');
const RESPONSE_TYPE = require('../utilities/responseTypes');
exports.savePostToDbb = (req,res) => {
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        if(err)
            return RESPONSE_TYPE._400(res,"Cannot post the data");
        return savePostToDbbRepo(res,{fields,files});
    })
}

exports.getSingleUserDbb = (req,res) => {
    const id = req.params.id;
    if(!id)
        return RESPONSE_TYPE._400(res,"No id was passeed");
    return getSinglePostDdb(res,id);
}