const express = require('express')
const {registerUser , updateProfile , uploadProfilePic , followUser,profileDesc,Home,getSingleUser} = require('../controller/user.controller')
const router = express.Router();

router.post('/adduser',registerUser)
router.post('/add-profile-pic',uploadProfilePic)
router.put('/updateprofile',updateProfile)

// TODO Following followers part 
router.post('/follow/user',followUser)
router.get('/profile/:id',profileDesc)
router.get('/Home/:id',Home)

router.get('/get/user/:name',getSingleUser)

module.exports = router;