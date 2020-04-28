// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colorsed by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '1mb'}));
app.set("view engine", "ejs");
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetRoutes = require("./routes/widgets");
const pointsRoutes = require("./routes/points");
const parksRoutes = require("./routes/parks");
const loginRoutes = require("./routes/login");
const restoRoutes = require("./routes/restaurants");
const mapRoutes = require("./routes/map-id");
const newmapRoutes = require("./routes/newmap");
const homepageRoutes = require("./routes/index");
const profileRoutes = require("./routes/profile");
const favRoutes = require("./routes/fav");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/points", pointsRoutes(db));
app.use("/api/widgets", widgetRoutes(db));
app.use("/parks", parksRoutes(db));
app.use("/restaurants", restoRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/map", mapRoutes(db));
app.use("/newmap", newmapRoutes(db));
app.use("/", homepageRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/favs", favRoutes(db));


// Note: mount other resources here, using the same pattern above

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
