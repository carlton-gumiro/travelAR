require("dotenv").config();
const axios = require("axios");

//Get nearby places to user's location - No search term

async function search_by_location(latitude, longitude, radius,res,req) {
  const location = `${latitude},${longitude}`

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${process.env.G_API_KEY}`;

  try {
    const response = await axios.get(url);

    const formattedPlaces = response.data.results.map((place) => {
      // Get photo reference if available
      const photoUrl =
        place.photos && place.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${place.photos[0].photo_reference}&key=${process.env.G_API_KEY}`
          : null;

      // Extract latitude and longitude from the geometry
      const latitude = place.geometry?.location?.lat;
      const longitude = place.geometry?.location?.lng;

      return {
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        open_now: place.opening_hours?.open_now || null,
        first_type: place.types.length > 0 ? place.types[0] : null,
        latitude: latitude,
        longitude: longitude,
        icon: place.icon,
        photoUrl: photoUrl,
        rating: place.rating,
        reviews: place.user_ratings_total || 0,
      };
    });

    //console.log(Object.entries(formattedPlaces).length);
    res.json({ results: formattedPlaces, status: response.data.status });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Google Places API');
  }
}

async function search_by_term(latitude, longitude, query, radius) {
  const location = `${latitude}, ${longitude}`|| "-17.8292,31.0522"; // Default to center of Harare

  // Create URLSearchParams to handle query parameters
  const params = new URLSearchParams({
    query: query,
    location: location, // Default to Harare
    radius: radius || 400, // Search radius in meters
    key: process.env.G_API_KEY,
  });

  // Construct the full URL
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`;

  try {
    const response = await axios.get(url);

    const filteredResults = response.data.results.map((place) => {
      // Get photo reference if available
      const photoUrl =
        place.photos && place.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${place.photos[0].photo_reference}&key=${process.env.G_API_KEY}`
          : null;

      // Extract latitude and longitude from the geometry
      const latitude = place.geometry?.location?.lat;
      const longitude = place.geometry?.location?.lng;

      return {
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        open_now: place.opening_hours?.open_now || null,
        first_type: place.types.length > 0 ? place.types[0] : null,
        latitude: latitude,
        longitude: longitude,
        icon: place.icon,
        photoUrl: photoUrl,
        rating: place.rating,
        reviews: place.user_ratings_total || 0,
      };
    });

    //console.log(filteredResults);
    //console.log(Object.entries(filteredResults).length);
    return filteredResults;
  } catch (error) {
    console.error(error);
    //res.status(500).send('Error fetching data from Google Places API');
    console.log("Error fetching data from Google Places API");
  }
}
//Default search function
async function search() {
  const location =  "-17.8292,31.0522"; // Default to center of Harare

  // Create URLSearchParams to handle query parameters
  const params = new URLSearchParams({
    query: 'restaurant',
    location: location, // Default to Harare
    radius: 400, // Search radius in meters
    key: process.env.G_API_KEY,
  });

  // Construct the full URL
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`;

  try {
    const response = await axios.get(url);

    const filteredResults = response.data.results.map((place) => {
      // Get photo reference if available
      const photoUrl =
        place.photos && place.photos.length > 0
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${place.photos[0].photo_reference}&key=${process.env.G_API_KEY}`
          : null;

      // Extract latitude and longitude from the geometry
      const latitude = place.geometry?.location?.lat;
      const longitude = place.geometry?.location?.lng;

      return {
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        open_now: place.opening_hours?.open_now || null,
        first_type: place.types.length > 0 ? place.types[0] : null,
        latitude: latitude,
        longitude: longitude,
        icon: place.icon,
        photoUrl: photoUrl,
        rating: place.rating,
        reviews: place.user_ratings_total || 0,
      };
    });

    //console.log(filteredResults);
    //console.log(Object.entries(filteredResults).length);
    return filteredResults;
  } catch (error) {
    console.error(error);
    //res.status(500).send('Error fetching data from Google Places API');
    console.log("Error fetching data from Google Places API");
  }
}


module.exports = { search_by_location, search_by_term, search };
