const express = require('express')
const {savePost} = require("../controller/posts.controller")
const router = express.Router();


router.post('/addpost',savePost)

module.exports = router;