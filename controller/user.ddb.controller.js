const formidable = require('formidable')
const RESPONSE_TYPE = require('../utilities/responseTypes');
const { getUserFromDB,addUserToDB,followUser } = require("../repositories/user.ddb.repo");
exports.getUserFromDB = (req,res) => {
    if(!req.body)
    return RESPONSE_TYPE._400(res,"User Not mentioned");

return getUserFromDB(res,req.params.id);
}


exports.putUserFromDB = (req,res) => {
    if(!req.body)
    return RESPONSE_TYPE._400(res,"User Not mentioned");

return addUserToDB(res,req);
}

exports.followUser = (req,res) => {
    if(!req.body)
    return RESPONSE_TYPE._400(res,"User Not mentioned");

return followUser(res,req);
}

