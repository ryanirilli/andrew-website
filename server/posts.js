const axios = require("axios");
const faker = require("faker");
const photosCached = require("./photos");

const fetchPosts = (isCached = false) => {
  const { UNSPLASH_ACCESS_KEY } = process.env;
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30`;
  return new Promise(async (resolve, reject) => {
    let photos = photosCached;
    try {
      if (!isCached) {
        photos = await axios.get(unsplashUrl);
      }
    } catch (e) {
      return reject(e.toString());
    }
    resolve(
      photos.data.map(photo => {
        return {
          title: faker.company.catchPhrase(),
          body: faker.lorem.sentences(30),
          createdAt: faker.date.recent(),
          photo
        };
      })
    );
  });
};

module.exports = fetchPosts;
