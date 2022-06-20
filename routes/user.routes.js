const express = require('express')
const {registerUser , updateProfile , uploadProfilePic , followUser} = require('../controller/user.controller')
const router = express.Router();

router.post('/adduser',registerUser)
router.post('/add-profile-pic',uploadProfilePic)
router.put('/updateprofile',updateProfile)

// TODO Following followers part 
router.post('/follow/user',followUser)


module.exports = router;