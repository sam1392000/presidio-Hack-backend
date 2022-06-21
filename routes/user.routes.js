const express = require('express')

const {registerUser , updateProfile , uploadProfilePic , followUser,profileDesc,Home,getSingleUser,publicPosts,selfPosts} = require('../controller/user.controller')


const router = express.Router();

router.post('/adduser',registerUser)
router.post('/add-profile-pic',uploadProfilePic)
router.put('/updateprofile',updateProfile)

// TODO Following followers part 
router.post('/follow/user',followUser)
router.get('/profile/:id',profileDesc)



router.get('/get/user/:name',getSingleUser)


router.get('/home/:id',Home)
router.get('/publicposts/',publicPosts)
router.get('/selfposts/:id',selfPosts)

module.exports = router;