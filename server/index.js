const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const fetch = require("isomorphic-fetch");
const Dropbox = require("dropbox").Dropbox;
const shuffle = require("lodash.shuffle");
dotenv.config();

const app = express();
const BASE_PATH = "/api/v1";

// Vimeo
const directingPath =
  "https://api.vimeo.com/users/andrewfranks/albums/5410730/videos";
const cinematographyPath =
  "https://api.vimeo.com/users/andrewfranks/albums/5410736/videos";
const editingPath =
  "https://api.vimeo.com/users/andrewfranks/albums/5410734/videos";
const vimeoClientId = process.env.VIMEO_CLIENT_ID;
const vimeoClientSecret = process.env.VIMEO_CLIENT_SECRET;

// Dropbox
const dropboxToken = process.env.DROPBOX_TOKEN;
const dbx = new Dropbox({
  accessToken: dropboxToken,
  fetch
});

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
            Buffer.from(`${vimeoClientId}:${vimeoClientSecret}`).toString(
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
  const directingPathWithToken = `${directingPath}/?access_token=${token}`;
  const directing = await axios.get(directingPathWithToken);

  const cinematographyPathWithToken = `${cinematographyPath}/?access_token=${token}`;
  const cinematography = await axios.get(cinematographyPathWithToken);

  const editingPathWithToken = `${editingPath}/?access_token=${token}`;
  const editing = await axios.get(editingPathWithToken);

  res.json({
    directing: { label: "Directing", ...directing.data },
    editing: { label: "Editing", ...editing.data },
    cinematography: { label: "Cinematography", ...cinematography.data }
  });
});

app.get(`${BASE_PATH}/photos`, async (req, res) => {
  const paths = await dbx.filesListFolder({ path: "/photos" });
  let data;
  try {
    const promises = paths.entries.map(item =>
      dbx.filesGetTemporaryLink({ path: item.path_lower })
    );
    data = await Promise.all(promises);
  } catch (e) {
    console.log("ERR: ", e);
  }
  res.json({ photos: data.map(item => item.link) });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
