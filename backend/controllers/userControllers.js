
const { User } = require('../db/models.js')
const bcrypt = require('bcrypt')
const saltRounds = 12
const jwt = require("jsonwebtoken")

const authUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }
    //verify password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }
    //if passwords match
    //generate jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // site has to be https
      samesite: 'strict', // prevent csrf attack
      maxAge: 7 * 60 * 60 * 1000  // 7 days
    })
    res.status(200).json({ _id: user._id, name: user.name, email: user.email })
  } catch (error) {
    res.status(400).json({ message: 'Invalid email or password.' })
  }
}

const registerUser = async (req, res) => {
  console.log('req.body:', req.body)
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' })
  }
  try {
    //hash plain password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await User.create({ name, email, password: hashedPassword })
    //generate jwt token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_TOKEN_SECRET)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // site has to be https
      samesite: 'strict', // prevent csrf attack
      maxAge: 7 * 60 * 60 * 1000  // 7 days
    })
    res.status(200).json({ _id: newUser._id, name: newUser.name, email: newUser.email })
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data.' })
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully.' })
}

const getUserProfile = async (req, res) => {
  res.status(200).json(req.user)
}

module.exports = { authUser, registerUser, logoutUser, getUserProfile }