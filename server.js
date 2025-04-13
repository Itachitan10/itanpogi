
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());





// productdatabsae 
// const itachitan = require("./backend/routes/product");
// itachitan.createuser()

const ejs = require("ejs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));


app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "frontend/html"));
app.use("/css", express.static(path.join(__dirname, "frontend/css")));
app.use("/html", express.static(path.join(__dirname, "frontend/html")));
app.use("/js", express.static(path.join(__dirname, "frontend/js")));

// import routes
const front = require("./backend/routes/register");
const login = require("./backend/routes/login");
const dash = require("./backend/routes/dashboard");
const cart = require("./backend/routes/cart");

// all routes
app.use("/", front);
app.use("/", login);
app.use("/", cart);
app.use('/', dash)

// server
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/login.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/dash.html"));
});
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/html/cart.html"));
});

 const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
