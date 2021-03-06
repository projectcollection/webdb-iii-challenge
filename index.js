const express = require('express')
const helmet = require('helmet')

const cohortsRoutes = require('./routes/cohortsRoutes')
const studentsRoutes = require('./routes/studentsRoutes')

const app = express()

app.use(express.json())
app.use(helmet())

app.use('/api/cohorts', cohortsRoutes)
app.use('/api/students', studentsRoutes)


const port = process.env.PORT || 5000

app.listen(port)
