const express = require('express')
const routes = express.Router()


routes.get('/checkout2', (req ,res )=>{ 
    res.render('checkoutall')
})

module.exports =routes