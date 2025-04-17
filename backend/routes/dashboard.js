const express = require("express");
const routes = express.Router();
const conn = require("../database/db");

routes.get("/dashboard", (req, res) => {
  res.render('dash');
});

routes.post("/cart_items", async (req, res) => {
  const userId = req.session.userId;
  const { price, img, name } = req.body;

  if (userId) {
    try {
      const result = await conn("INSERT INTO product (price, img, name, user_id) VALUES (?, ?, ?, ?)", [price, img, name, userId]);

      if (!result) {
        console.log('Hindi nagtagumpay ang pagdagdag ng item sa cart');
        return res.status(400).json({ message: "Hindi matagumpay na idinagdag ang item sa cart" });
      }


      res.cookie('userId', userId, {
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === 'production', 
      });

      console.log("Tagumpay ang pagdagdag ng item sa cart");
      return res.status(200).json({ message: "Item idinagdag sa cart" });

    } catch (err) {
      console.error("Error sa pag-insert ng item sa cart:", err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    console.log('Walang user na naka-log in');
    return res.status(401).json({ message: "Walang user na naka-log in" });
  }
});

routes.get('/item_cart', async (req, res) => {
  const id = req.cookies.userId;  

  try {
    if (id) {
      const users_unique_item = await conn("SELECT * FROM product WHERE user_id = ?", [id]);

      if (users_unique_item.length > 0) {
        console.log('successful lna kinuha ang mga unique na item');
        return res.json(users_unique_item);
      } else {
        console.log('Walang item na nahanap para sa user na ito');
        return res.status(404).json({ message: "Walang item na nahanap" });
      }
    } else {
      console.log('Walang user na nasa cookies');
      return res.status(401).json({ message: "Walang user na nasa cookies" });
    }
  } catch (err) {
    console.error('Error sa pagkuha ng mga item sa cart:', err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = routes;
