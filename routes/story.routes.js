const express = require('express')

const {getStory,deleteStory} = require('../controller/story.controller')

const router = express.Router();

router.get('/getstory/:id',getStory)
router.delete('/deletestory/:id',deleteStory)
module.exports = router;