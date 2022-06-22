const formidable = require('formidable');


const { getStory , addStoryToDb,deleteStory} = require('../repositories/story.repository');




const RESPONSE_TYPE = require('../utilities/responseTypes');

exports.getStory = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    // console.log(req.params.id);
    return getStory(res,req.params.id);

    // console.log(data.status);
    
}


exports.addStory = (req,res) => {
    const form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) => {
        if(err || !files || !fields)
            return RESPONSE_TYPE._400(err,"No story");
        return addStoryToDb(res,fields,files);
            
    })

}
exports.deleteStory = async (req,res) => {
    if(!req.body)
        return RESPONSE_TYPE._400(res,"User Not mentioned");
    // console.log(req.params.id);
    return deleteStory(res,req.body);

    // console.log(data.status);
    
}

