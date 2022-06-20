const express = require('express')
const {savePost,likePost} = require("../controller/posts.controller");

const router = express.Router();


router.post('/addpost',savePost)
router.post('/likes',likePost)
module.exports = router;