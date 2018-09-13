const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
const BASE_PATH = "/api/v1";
const directingPath =
  "https://api.vimeo.com/users/andrewfranks/albums/5410730/videos";
const vimeoClientId = process.env.VIMEO_CLIENT_ID;
const vimeoClientSecret = process.env.VIMEO_CLIENT_SECRET;

app.use(express.static(path.join(__dirname, "../client/build")));

let tokenData = null;

app.get(`${BASE_PATH}/videos`, async (req, res) => {
  if (!tokenData) {
    try {
      tokenData = await axios({
        method: "post",
        url: "https://api.vimeo.com/oauth/authorize/client",
        headers: {
          Authorization:
            "basic " +
            Buffer.from(vimeoClientId + ":" + vimeoClientSecret).toString(
              "base64"
            )
        },
        data: {
          grant_type: "client_credentials",
          scope: "public"
        }
      });
    } catch (err) {
      throw new Error("error fetching auth token from vimeo");
    }
  }

  const token = tokenData.data.access_token;
  const path = `${directingPath}/?access_token=${token}`;
  const vimeoRes = await axios.get(path);
  res.json({ directing: vimeoRes.data });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
