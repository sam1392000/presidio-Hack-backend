const express = require('express')

const {getStory} = require('../controller/story.controller')

const router = express.Router();

router.get('/getstory/',getStory)
module.exports = router;