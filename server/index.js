const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const fetchPosts = require("./posts");
dotenv.config();

const app = express();
const BASE_PATH = "/api/v1";

app.use(express.static(path.join(__dirname, "../client/build")));

app.get(`${BASE_PATH}/all-posts`, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const posts = await fetchPosts().catch(errorMessage => {
  	res.status(500).send(errorMessage);
  });
  res.send(JSON.stringify(posts));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
