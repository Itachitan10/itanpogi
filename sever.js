const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const ejs = require("ejs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "frontend/html"));
app.use("/css", express.static(path.join(__dirname, "frontend/css")));
app.use("/html", express.static(path.join(__dirname, "frontend/html")));

// import routes
const front = require("./backend/routes/register");
const login = require("./backend/routes/login");

const cart = require("./backend/routes/cart");

// all routes
app.use("/", front);
app.use("/", login);
app.use("/", cart);

// server
const port = 3000;


app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
