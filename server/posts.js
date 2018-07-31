const axios = require("axios");
const { UNSPLASH_ACCESS_KEY } = process.env;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30`;
const fetchPhotos = async () => {
  const photos = await axios.get(unsplashUrl);
  return photos;
};

module.exports = fetchPhotos;
