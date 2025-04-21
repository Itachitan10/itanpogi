const express = require("express");
const routes = express.Router();


routes.get('/Admin', (req , res)=>{ 
    res.render('main')
})


module.exports = routes