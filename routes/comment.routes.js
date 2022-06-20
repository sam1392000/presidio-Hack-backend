const express = require('express');
const { addComments } = require('../controller/comment.controller');
const router = express.Router();

router.post('/add/comment',addComments)

module.exports = router;