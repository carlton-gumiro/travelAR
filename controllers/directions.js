require("dotenv").config();
const axios = require("axios");


//Logic to get destination coordinates

async function destination_coordinates(latitude, longitude) {
  const destination = {
    latitude: latitude || -17.8252, // Example destination latitude
    longitude: longitude || 31.0522, // Example destination longitude
  };

  return destination;
}

async function directions(latitude, longitude, mylatitude, mylongitude,res) {
  try {
    // Fetch directions from Google Directions API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin: `${mylatitude},${mylongitude}`,
          destination: `${latitude},${longitude}`,
          key: process.env.G_API_KEY, // Replace with your Google Maps API key
        },
      }
    );

    const steps = response.data.routes[0].legs[0].steps.map((step) => ({
      instruction: step.html_instructions,
      distance: step.distance.text,
      end_location: step.end_location,
    }));

    return steps

  } catch (error) {
    console.error("Error fetching directions:", error);
    res.status(500).send("Error fetching directions");
  }
}
module.exports = { destination_coordinates , directions};
