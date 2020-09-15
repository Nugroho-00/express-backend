const express = require('express')
const bodyParser = require('body-parser')

const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/kategori')
const chartRouter = require('./src/routes/chart')
const userRouter = require('./src/routes/user')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/chart', chartRouter)
app.use('/user', userRouter)

app.listen(8000, () => {
  console.log('App listening on port http://localhost:8000')
})
