const express = require('express')
const dotenv = require('dotenv')
const { use } = require('./routes/goalRoutes')
const {errorhandler} = require('./middleware/errorMiddleware')

dotenv.config() // Passe tout dans process

const port = process.env.PORT || 5000
const app = express()


app.use(express.json())     // On pourrait utiliser aussi body-parser
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require( './routes/goalRoutes'))
app.use(errorhandler)       // Overwrite standard error handler

app.listen(port, () => console.log(`Server started on ${port}`))
