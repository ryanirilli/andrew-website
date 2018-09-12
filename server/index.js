const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const BASE_PATH = "/api/v1";

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
