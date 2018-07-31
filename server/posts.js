const axios = require("axios");
const { UNSPLASH_ACCESS_KEY } = process.env;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30`;

const fetchPhotos = () => {
  return new Promise(async (resolve, reject) => {
  	let photos;
  	try {
  		photos = await axios.get(unsplashUrl);		
  	} catch (e) {  		
  		return reject(e.toString());
  	}  	
  	resolve(photos.data);
  });
};

module.exports = fetchPhotos;
