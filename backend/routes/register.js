const express = require("express");
const routes = express.Router();

const conn = require("../database/db");

routes.get("/registerform", (req , res, next)=>{ 
    res.render('register')
})

routes.post("/alluser", async(req, res) => {
 const {username , password } = req.body;

  console.log(username , password);
  const sql = await conn(`INSERT INTO information (username , password) VALUES("${username}" , "${password}")`);
  if(sql){ 
    res.send('successfull  inserting data')
  }else{ 
    res.send('failed inserting data')
  }
});

module.exports = routes;
