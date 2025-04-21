
const express = require("express");
const routes = express.Router();


routes.get('/checkout', (req , res)=>{ 
    res.render('ckoutpage')
})



module.exports = routes