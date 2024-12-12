const express = require("express");
const router = express.Router();
const {
  search_by_location,
  search_by_term,
  search,
} = require("../controllers/places");
require("dotenv").config();

//Get all nearby places to my location

router.get("/nearby", async (req, res) => {
  const { latitude, longitude, radius = 1500, term } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  // Call the nearby_search function
  let returned_places;

  if (term) {
    // If a search term is provided, include it in the nearby search
    console.log(term);
    returned_places = await search_by_term(
      latitude,
      longitude,
      term,
      radius,
      res,
      req
    );
    res.json({ response: returned_places });
  } else {
    // If no search term is provided, perform the search without it
    returned_places = await search_by_location(
      latitude,
      longitude,
      radius,
      res,
      req
    );
  }

  // Render the response with the returned places
  res.render("home", {
    place: returned_places,
    key: process.env.G_API_KEY,
  });
});

//Get surrounding places based on user's location
router.get("", async (req, res) => {
  const allPlaces = await search();
  console.log(allPlaces);
  res.render("home", {
    place: allPlaces,
    key: process.env.G_API_KEY,
  });
});

// Get places based on search term

router.get("/search", async (req, res) => {
  const { latitude, longitude, term } = req.query;

  if (!latitude || !longitude || !term) {
    return res
      .status(400)
      .json({ error: "Latitude, longitude, and search term are required." });
  }

  try {
    const returned_places = await search_by_term(latitude, longitude, term); // Adjust your function as needed

    // Render the search results page with the places
    res.render("search_results", { places: returned_places, key: process.env.G_API_KEY }); // Replace with your actual API key
  } catch (error) {
    console.error("Error fetching places:", error);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching places." });
    }
  }
});

module.exports = router;
