const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const { get_places, nearby_places } = require("./controllers/places");
const { destination_coordinates, directions } = require("./controllers/directions");
const { long } = require("webidl-conversions");

const port = process.env.PORT || 3000;

// Middleware

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Auth Routes
app.use("/", require("./routes/auth"));
//Places routes
app.use("/places", require("./routes/places"));

//HomePage
/*
app.get("/", async (req, res) => {
  //data = await get_places()
  //data = await nearby_places();
  res.json(data);
  //res.render('test')
});*/

// Route for ar route display
app.get("/route", async (req, res) => {
  const {latitude , longitude, mylatitude, mylongitude } = req.query
  const destination = await directions(latitude,longitude,mylatitude,mylongitude);
  //console.log(destination)
  res.render("turn_by_turn", {
    steps: destination,
    mylatitude,
    mylongitude,
    key: process.env.G_API_KEY
  });
});

// Route to display step by step directions for electronic map
app.get("/directions", async (req, res) => {
  const {latitude , longitude,name } = req.query
  const destination = await destination_coordinates(latitude,longitude);
  res.render("directions", {
    destination,
    name,
    key: process.env.G_API_KEY
  });
});

/*
app.get("/places/view", async (req, res) => {
  const places = await get_places();
  res.render("places_ar");
});*/

app.listen(3000, () => {
  console.log(`Listening on port: ${port}`);
});
