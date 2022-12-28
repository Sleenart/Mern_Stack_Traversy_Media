const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const { use } = require('./routes/goalRoutes')
const {errorhandler} = require('./middleware/errorMiddleware')
const connectDB  = require ('../backend/config/db')

dotenv.config() // Passe tout dans process

connectDB()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())     // On pourrait utiliser aussi body-parser
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require( './routes/goalRoutes'))
app.use('/api/users', require( './routes/userRoutes'))
app.use(errorhandler)       // Overwrite standard error handler

app.listen(port, () => console.log(`Server started on ${port}`))
