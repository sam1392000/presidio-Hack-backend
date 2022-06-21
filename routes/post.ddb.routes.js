const express = require('express');
const { savePostToDbb,getSingleUserDbb } = require('../controller/post.ddb.controller');

const router = express.Router();

router.post('/addpost',savePostToDbb)
router.get('/get/post/:id',getSingleUserDbb)
module.exports = router;