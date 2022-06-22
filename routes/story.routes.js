const express = require('express')

const {getStory,addStory} = require('../controller/story.controller')

const router = express.Router();

router.get('/getstory/',getStory)

router.post('/addstory',addStory)

module.exports = router;