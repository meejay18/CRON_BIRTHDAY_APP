const express = require('express')
require('./config/database')
const app = express()
app.use(express.json())
const PORT = process.env.PORT

const userRouter = require('./router/userRouter')
const { cronSchedule } = require('./utils/cronJob')
app.use(userRouter)

cronSchedule()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
