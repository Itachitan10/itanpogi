const express = require("express");
const routes = express.Router();
// const path = require("path");

// routes.get("/dashboard", (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/html/dash.html'))
// });

routes.use(express.json());
const conn = require("../database/db");

const sql1 = [];

//   sending item to the cart page
routes.post("/cart_items", async (req, res) => {
  const { price, img, name } = req.body;
  const sql1 = await conn("INSERT INTO product (price, img, name) VALUES (?, ?, ?)",
  [price, img, name]);
  try {
    if (!sql1) {
      console.log(" Failed to add item to car");

      return res.status(400).json({ message: "Failed to add item to cart" });
    } else {
      console.log(" sucess add item to car");

      return res.status(200).json({ message: "Item added to cart" });
    }
  } catch {
    console.log("error");
  }
});

// api cartitem

routes.get("/item_cart", async (req, res) => {
  try {
    const items = await conn("SELECT * FROM product");
    res.json(items);
  } catch (err) {
    console.error("Database error:", err);
  }
});

// routes.get('/test_api', (req ,res)=>{
//     res.send(cartItems)
// })

module.exports = routes;
