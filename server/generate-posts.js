const fs = require("fs");
const faker = require("faker");
const axios = require("axios");
const dotenv = require("dotenv");
const shuffle = require("lodash.shuffle");

dotenv.config();

const { UNSPLASH_ACCESS_KEY } = process.env;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=30&query=professional`;
const tags = [
  "tech",
  "artificial intelligence",
  "scalable systems",
  "data science",
  "backend",
  "frameworks",
  "SOA",
  "microservices",
  "hot feature"
];
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

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomPhoto = () => {
  if (postPhotoIndex === postPhotos.length) {
    shuffle(postPhotos);
    postPhotoIndex = 0;
  }
  return postPhotos[postPhotoIndex++];
};

const getRandomTags = numTags => {
  const checkTags = () => {
    if (tagIndex === tags.length) {
      shuffle(tags);
      tagIndex = 0;
    }
  };
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
    ${faker.lorem.sentences(5)} [${faker.lorem.words(
    3
  )} link](https://www.google.com) ${faker.lorem.sentences(5)} :smiley:
    ${getRandomPhoto()}
    
    > ${faker.lorem.sentences(1)}
    > ${faker.lorem.sentences(1)}
       
    ## ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(getRandomInt(3, 6))}
    ${faker.lorem.sentences(getRandomInt(5, 10))}
    ${getRandomPhoto()}
    ## ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(getRandomInt(5, 10))}
    ${faker.lorem.sentences(getRandomInt(3, 6))}
    ### ${faker.company.catchPhrase()}
    ${faker.lorem.sentences(getRandomInt(5, 10))}
    ${faker.lorem.sentences(getRandomInt(3, 6))}
    ${getRandomPhoto()}     
    ${faker.lorem.sentences(getRandomInt(5, 10))}
    ### Conclusion
    ${faker.lorem.sentences(getRandomInt(4, 6))}
    ${faker.lorem.sentences(getRandomInt(7, 10))}
  `
    .trim()
    .replace(/^ +/gm, "");
};

const getComments = numComments => {
  const result = [];
  for (let i = 0; i < numComments; i++) {
    result.push({
      createdAt: faker.date.recent(),
      author: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.image.avatar()
      },
      comment: faker.lorem.sentences(getRandomInt(3, 5))
    });
  }
  return result;
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
      preview: faker.lorem.sentences(getRandomInt(2, 3)),
      createdAt: faker.date.recent(7),
      tags: getRandomTags(getRandomInt(1, 4)),
      favorites: getRandomInt(1, 20000),
      comments: getComments(getRandomInt(1, 20)),
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
