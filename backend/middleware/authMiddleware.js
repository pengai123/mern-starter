const jwt = require('jsonwebtoken')
const { User } = require('../db/models.js')
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const verifyAuth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token.' })
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    console.log('decoded:', decoded)
    req.user = await User.findById(decoded._id).select('-password')
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token.' })
  }

}

module.exports = { verifyAuth }