const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 
const cookieParser = require("cookie-parser")
app.use(express.json());
const session = require("express-session");
app.use(express.static('public'))


app.use(cookieParser())

app.use(
  session({
    secret: "secret-key", // palitan mo ito ng mas secure na string sa production
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, // optional: 1 hour
  })
);

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
app.use("/html", express.static(path.join(__dirname, "./admin_folder/html")));
app.use("/css", express.static(path.join(__dirname, "/admin_folder/css")));
app.use("/js", express.static(path.join(__dirname, "./admin_folder/js")));

// import routes
const front = require("./backend/routes/register");
const login = require("./backend/routes/login");
const dash = require("./backend/routes/dashboard");
const cart = require("./backend/routes/cart");
const checkout = require('./backend/routes/ckoutpage')
const admin = require('./backend/routes/admin_dash_main')
const chechout2 =require('./backend/routes/checkoutall')




// all routes
app.use("/", front);
app.use("/", login);
app.use("/", cart);
app.use("/", dash);
app.use('/', checkout)
app.use('/', admin)
app.use('/', chechout2)
// server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/html/register.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/html/login.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/html/dash.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/html/cart.html"));
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/html/ckoutpage.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/admin_folder/html/main.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
