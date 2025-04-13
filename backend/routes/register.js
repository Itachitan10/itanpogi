const express = require("express");
const routes = express.Router();
// const path = require('path')

const conn = require("../database/db");

routes.get("/register", (req, res) => {
  res.render('register')
});

const  sql1 = [];
routes.post("/alluser", async(req, res) => {
 const {username , password } = req.body;

  console.log(username , password);
  const sql1 = await conn(`INSERT INTO information (username , password) VALUES("${username}" , "${password}")`);

  if(sql){ 
    res.send('successfull  inserting data')
  }else{ 
    res.send('failed inserting data')
  }
});



module.exports = routes;
