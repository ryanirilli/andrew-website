const axios = require("axios");
const faker = require("faker");
const photosCached = require("./photos");

const createBody = () => {
  return `
    ${faker.lorem.sentences(
      5
    )} [I'm an inline-style link](https://www.google.com) ${faker.lorem.sentences(
    5
  )} :smiley:
    
    > Blockquotes are very handy in email to emulate reply text.
    > This line is part of the same quote.
    
    ### Another thing to note
    ${faker.lorem.sentences(3)}
    
    ${faker.lorem.sentences(5)}
    
    ## Neat Formatting
    ${faker.lorem.sentences(10)}
    ![cute little kitty](http://placekitten.com/800/300 "place kitten")
  `
    .trim()
    .replace(/^ +/gm, "");
};

const fetchPosts = (isCached = false) => {
  const { UNSPLASH_ACCESS_KEY } = process.env;
  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30`;
  let id = 0;
  return new Promise(async (resolve, reject) => {
    let photos = photosCached;
    try {
      if (!isCached && UNSPLASH_ACCESS_KEY) {
        photos = await axios.get(unsplashUrl);
      }
    } catch (e) {
      return reject(e.toString());
    }
    resolve(
      photos.data.map(photo => {
        return {
          id: id++,
          title: faker.company.catchPhrase(),
          body: createBody(),
          createdAt: faker.date.recent(7),
          photo
        };
      })
    );
  });
};

module.exports = fetchPosts;
