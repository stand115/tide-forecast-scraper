const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
const port = 4000;

// format json output for browser viewing
app.set("json spaces", 3);

// we'll use the /scrape endpoint to trigger the web scraper
app.get("/scrape", function(req, res) {
  let output = {};
  scrape("Half-Moon-Bay-California", output);
  scrape("Huntington-Beach", output);
  scrape("Providence-Rhode-Island", output);
  scrape("Wrightsville-Beach-North-Carolina", output);
  res.json(output);
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

let scrape = (location, output) => {
  output[location] = [];
  let url = `https://www.tide-forecast.com/locations/${location}/tides/latest`;
  let date = "";

  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html);
      let inDayRange = false;
      console.log($);
    }
  });
};

module.exports = app;
