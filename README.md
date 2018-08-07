# Better Up Blog
A blog prototype for Better Up consideration. [Live Site](https://better-up-blog.herokuapp.com/)

## Local Environment
this project uses `Node v9` to make use of modern Javascript features. If you'd like you can install and use [nvm](https://github.com/creationix/nvm) to manage your Node version

## Install
```
git clone https://github.com/ryanirilli/better-up-blog.git
cd better-up-blog
yarn && cd ./client && yarn
```
## Start Dev Servers
from the project root
```
node server
```
open a new terminal tab and cd into the project root
```
cd ./client
yarn start
```

The startup script should open your browser but if it doesn't, open your browser and go to http://localhost:3000

# Architecture

## Server

The backend is a simple Express app that serves the static assets as well as two API endpoints
```
/api/v1/posts
/api/v1/post/:postId
```

The posts themselves are mocked and generated from a script I wrote that uses [faker.js](https://github.com/marak/Faker.js/) and
the [Unsplash API](https://unsplash.com/). If you would like to generate your own posts you need to create an app with the
Unsplash service and create a `.env` file in the root directory and set the `UNSPLASH_ACCESS_KEY` environment variable.

The post content is generated and rendered in Markdown and parsed using [showdown](https://github.com/showdownjs/showdown) in the client.

## Client

I chose to use Create React App for this project because of the rich build configuration for dev and prod environments. I
considered using ember-cli but decided it would curb my velocity given my most recent experience has been using React. I have
used Ember extensively in the past for both commercial and personal projects, for example, [Visaudio ](https://github.com/ryanirilli/visaudio/settings)
is an Ember app I worked on with a friend for a Dolby Digital audio hackathon. [Live Site](http://visaudio.me/)

## CSS in JS

Fairly recently, css-in-js has been an up and coming approach to managing CSS. [Emotion](https://emotion.sh/docs/introduction) has
emerged as a great framework for managing your styles that allows you to build an entire design system that is extensible, performant,
and easy to use. By allowing your style values to be derived from props and providing composition, it opens up a great deal
of flexibility. I am still developing my own sense of best practices but am very happy with how this turned out.

For the responsive aspect, I created named breakpoints (small, medium, large, xLarge) that can be used in any style using
the MQ module.

The entire app is based on a `4px` grid aliased as `BASE_SPACING_UNIT` and that constant is used throughout the site (no magic numbers!)
This ensures a certain vertical rhythm. Given more time I would refactor some instances to have more constants with named spacing
values similar to the breakpoints.

## Animation

For animated transitions and interactions I chose to use [Anime.js](http://animejs.com/) which is a declarative animation
library. By leveraging promises, timelines, React lifecycle hooks and async/await, it makes animation integration very concise
and maintainable. Again, with more time I would build the animation principles into the design system and create a cohesive
motion language around the user experience.

## Flow

This site uses the [Flow](https://flow.org/) static type checker in the client. The benefits of statically typed Javascript
cannot be understated and greatly help with the developer experience and preventing runtime bugs.

## Prettier

All code formatting is managed using [Prettier](https://github.com/prettier/prettier)

## Thank You

Thank you Better Up team for your time and consideration. I am very passionate about this work and love building great
user experiences. It was a pleasure to work on this take home assignment!
