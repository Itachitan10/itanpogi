const express = require('express')
const routes = express.Router(); 


routes.get('/cart',  (req  , res)=>{ 
    res.render('cart');
})

module.exports = routes 