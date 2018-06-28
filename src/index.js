const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
const port = 4000;

app.get("/scrape", function(req, res) {
  res.end();
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;
