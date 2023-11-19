const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../middleware/authMiddleware.js')
const { authUser, registerUser, logoutUser, getUserProfile } = require('../controllers/userControllers.js')

router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.get('/profile', verifyAuth, getUserProfile)


module.exports = router