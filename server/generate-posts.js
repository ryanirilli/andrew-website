const fs = require("fs");
const faker = require("faker");
const axios = require("axios");
const dotenv = require("dotenv");
const shuffle = require('lodash.shuffle');

dotenv.config();

const { UNSPLASH_ACCESS_KEY } = process.env;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30&query=tech`;
const tags = ['tech', 'artificial intelligence', 'scalable systems', 'data science', 'backend', 'frameworks', 'SOA', 'microservices', 'hot feature'];
const postPhotos = [
  '![better up chart](https://www.betterup.co/wp-content/themes/betterup-2018/images/results-members-rate-graph2.jpg "chart")',
  '![better up chart](https://www.betterup.co/wp-content/themes/betterup-2018/images/home-iphone-waiting-room@2x.png "phone")',
  '![better up chart](https://www.betterup.co/wp-content/themes/betterup-2018/images/home-results@2x.jpg "pillars")',
  '![better up chart](https://www.betterup.co/wp-content/themes/betterup-2018/images/results-graph2.png "pillars")',
  '![better up chart](https://www.betterup.co/wp-content/themes/betterup-2018/images/results-impact2.jpg "pillars")'
];
shuffle(tags);
shuffle(postPhotos);

let id = 0;
let postPhotoIndex = 0;
let tagIndex = 0;

const getRandomPhoto = () => {
    if (postPhotoIndex === postPhotos.length) {
      shuffle(postPhotos);
      postPhotoIndex = 0;
    }
    return postPhotos[postPhotoIndex++];
};

const getRandomTags = (numTags) => {
    const checkTags = () => {
      if (tagIndex === tags.length) {
        shuffle(tags);
        tagIndex = 0;
      }
    }
    checkTags();
    let result = [];
    for (let i = 0; i < numTags; i++) {
      checkTags();
      result.push(tags[tagIndex++]);
    }
    return result;
};

const createBody = () => {
  return `
    ${faker.lorem.sentences(
      5
    )} [I'm an inline-style link](https://www.google.com) ${faker.lorem.sentences(
    5
  )} :smiley:
    ${getRandomPhoto()}
    
    > Blockquotes are very handy in email to emulate reply text.
    > This line is part of the same quote. 
       
    ## ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(3)}
    ${faker.lorem.sentences(8)}
    ${getRandomPhoto()}
    ## ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(10)}
    ${faker.lorem.sentences(5)}
    ### ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(10)}
    ${faker.lorem.sentences(3)}
    ${getRandomPhoto()}     
    ${faker.lorem.sentences(10)}
    ### Conclusion
    ${faker.lorem.sentences(4)}
    ${faker.lorem.sentences(7)}
  `
    .trim()
    .replace(/^ +/gm, "");
};

const getData = async () => {
  console.log("...fetching unsplash photos");
  let photos = null;
  try {
    photos = await axios.get(unsplashUrl);
    console.log("fetch unsplash photos success");
  } catch (e) {
    throw new Error(e.toString());
  }
  let data = photos.data.map(photo => {
    return {
      id: id++,
      title: faker.company.catchPhrase(),
      body: createBody(),
      createdAt: faker.date.recent(7),
      tags: getRandomTags(Math.floor(Math.random() * 4) + 1),
      photo
    };
  });
  fs.writeFileSync(
    "./server/posts.json",
    JSON.stringify({ data }, undefined, 4)
  );
  console.log("done generating photos!");
};

getData();
