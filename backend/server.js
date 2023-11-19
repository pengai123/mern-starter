const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
// const bp = require('body-parser')
// const connectDB = require('./db')
// const userRoutes = require('./routes/userRoutes.js')
// const path = require('path')
// const APPDIR = path.resolve()
// connectDB()

// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))
// app.use('/api/users', userRoutes)

console.log('NOD_ENV:', process.env.NODE_ENV)

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(APPDIR, 'frontend/dist')))
  app.get('*', (req, res) => res.sendFile(path.join(APPDIR, 'frontend/dist/index.html')))
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))