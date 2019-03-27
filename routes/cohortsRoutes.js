const route = require('express').Router()

route.get('/', (req, res) => {
    res.send('works')
})

module.exports = route