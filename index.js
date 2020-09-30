const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/kategori')
const chartRouter = require('./src/routes/chart')
const profileRouter = require('./src/routes/profile')
const userRouter = require('./src/routes/user')
const roleUserRouter = require('./src/routes/roleUser')
const authRouter = require('./src/routes/auth')

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// import middleware auth
const authMiddleware = require('./src/middleware/auth')

// import provide static file
app.use('/uploads', express.static('assets/uploads'))

// routes
app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/chart', chartRouter)
app.use('/auth', authRouter)
// app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/roles', roleUserRouter)
app.use('/user', authMiddleware, userRouter)

app.listen(8000, () => {
  console.log('App listening on port http://localhost:8000')
})
