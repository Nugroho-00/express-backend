require('dotenv').config()
const { BACKEND_PORT } = process.env
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('assets/uploads/'))

// import Authentikasi
const Auth = require('./src/middleware/auth')

// import router for access
const Authentikasi = require('./src/routes/auth')
const Admin = require('./src/routes/admin')
const Seller = require('./src/routes/seller')
const Customer = require('./src/routes/customer')
const Public = require('./src/routes/public')

// use access route
app.use('/auth', Authentikasi)
app.use('/admin', Auth.Admin, Admin)
app.use('/seller', Auth.Seller, Seller)
app.use('/customer', Auth.Customer, Customer)
app.use('/public', Public)

app.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Backend is Running now'
  })
})

app.listen(BACKEND_PORT, () => {
  console.log(`App listening on port ${BACKEND_PORT}`)
})
