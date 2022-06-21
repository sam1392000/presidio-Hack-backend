const express = require('express')

const {savePost , getPost,likePost} = require("../controller/posts.controller")




const router = express.Router();


router.post('/addpost',savePost)

router.get('/getpost/:id',getPost)


router.post('/likes',likePost)

module.exports = router;