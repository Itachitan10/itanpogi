const express = require("express");
const routes = express.Router();
// const path = require('path')

routes.get("/cart", (req, res) => {
  res.render("cart");
});

const conn = require("../database/db");

// delete item one iten on the cart
routes.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;

  console.log(id);

  const results = await conn("DELETE FROM product WHERE id = ? LIMIT 1", [id]);

  if (results) {
    console.log("successful deleteng data");
  } else {
    console.log("failed deleteng data");
  }
});

routes.delete("/delete2/:id", async (req, res) => {
  let id = req.params.id;

  console.log(id);

  const results = await conn("DELETE FROM product WHERE id = ?", [id]);

  if (results) {
    console.log("successful deleteng data");
  } else {
    console.log("failed deleteng data");
  }
});

module.exports = routes;
