const express = require('express')

const {registerUser , updateProfile , uploadProfilePic ,getallmyFollowers, followUser,profileDesc,Home,getSingleUser,publicPosts,selfPosts,likepost,selfPostslen,unfollowUser,getallUser} = require('../controller/user.controller')

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
router.post('/like/',likepost)
router.get('/selfpostslen/:id',selfPostslen)
router.post('/unfollow/user',unfollowUser)
router.get('/myfollowers/:id',getallUser)

router.get('/getmyfollowers/:id',getallmyFollowers)

module.exports = router;