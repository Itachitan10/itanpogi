const express = require ("express")
const routes =express.Router()

routes.get('/login',  (req, res ,next)=>{ 
    res.render('login')
})



module.exports = routes;