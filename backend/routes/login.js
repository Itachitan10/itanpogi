const express = require("express");
const routes = express.Router();
const path = require("path");

const conn = require("../database/db");

// login page
routes.get("/login", (req, res) => {
  res.render("login");
});

// login comparision database
routes.post("/login1", async (req, res) => {
  const { username1, password1 } = req.body;

  try {
    const result = await conn( "SELECT * FROM information WHERE username = ? AND password = ? ", [username1, password1])


      if (result.length > 0) {
        req.session.username = result[0].username;

        console.log("Login successful:", result[0]);
        return res
          .status(200)
          .json({ message: "Login successful", user: result[0] });
        return;
      } else {
        console.log("Invalid credentials");
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    
  } catch {
    console.error("Database error:");
    return res.status(500).json({ message: "Server error" });
  }
});

routes.get("/dash", (req, res) => {
    console.log("Session username:", req.session.username);
  
    res.json({ username: req.session.username });
  });
  

  routes.get('/logout', (req, res) => { 
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).send({ msg: 'Error logging out' });
        }
        res.clearCookie('connect.sid');

        return res.status(200).send({ msg: 'Logged out successfully' });
    });
});

  

module.exports = routes;
