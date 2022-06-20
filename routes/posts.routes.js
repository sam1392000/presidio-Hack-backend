const express = require('express')
const {savePost , getPost} = require("../controller/posts.controller")
const router = express.Router();


router.post('/addpost',savePost)
router.get('/getpost/:id',getPost)

module.exports = router;