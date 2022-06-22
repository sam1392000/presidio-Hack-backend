const express = require('express')

const {getStory,addStory,deleteStory} = require('../controller/story.controller')

const router = express.Router();


router.post('/addstory',addStory)
router.get('/getstory/:id',getStory)
router.delete('/deletestory/',deleteStory)


module.exports = router;