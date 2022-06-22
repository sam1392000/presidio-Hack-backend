const formidable = require('formidable');

const { getStory} = require('../repositories/story.repository');


const RESPONSE_TYPE = require('../utilities/responseTypes');

exports.getStory = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    // console.log(req.params.id);
    return getStory(res,req.params.id);

    // console.log(data.status);
    
}