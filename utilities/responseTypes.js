const RESPONSE_TYPE = {
    _200(res,data){
        return res.status(200).json({data});
    },
    _400(res,data){
        return res.status(400).json({data})
    }
}
module.exports = RESPONSE_TYPE;