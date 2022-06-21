const express = require('express')

const {getUserFromDB,putUserFromDB,followUser} = require('../controller/user.ddb.controller')


const router = express.Router();

router.get('/getuser/:id',getUserFromDB)

router.post('/putuser/',putUserFromDB)
router.post('/followuser/',followUser)
module.exports = router;