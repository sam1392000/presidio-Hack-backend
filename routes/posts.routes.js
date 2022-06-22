const express = require('express')

const {savePost , getPost,likePost,getCommentsWithName} = require("../controller/posts.controller")




const router = express.Router();


router.post('/addpost',savePost)

router.get('/getpost/:id',getPost)

router.get('/getcomments/:id',getCommentsWithName);



module.exports = router;