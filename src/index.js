const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
const port = 4000;

// format json output for browser viewing
app.set("json spaces", 3);

// we'll use the /scrape endpoint to trigger the web scraper
app.get("/scrape", (req, res) => {
  let output = {};
  // call the scrape function for each location and return the output object in response
  scrape("Half-Moon-Bay-California", output, function(data) {
    scrape("Huntington-Beach", output, function(data) {
      scrape("Wrightsville-Beach-North-Carolina", output, function(data) {
        scrape("Providence-Rhode-Island", output, function(data) {
          res.json(output);
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

// helper function to make requests to forecast site and extract data
let scrape = (location, output, cb) => {
  // initialize array to contain low tide date, format url
  output[location] = [];
  let url = `https://www.tide-forecast.com/locations/${location}/tides/latest`;
  let date = "";

  request(url, (error, response, html) => {
    if (!error) {
      let $ = cheerio.load(html);
      // use this to toggle when we're in and out of daylight
      let daylight = false;

      // data rows exist in the in the tbody element, that's what we'll traverse
      $("tbody")
        .children()
        .each(function(i, el) {
          // capture the date from parent row when for each day in the table
          if (
            $(this)
              .children(".date")
              .text().length
          ) {
            date = $(this)
              .children(".date")
              .text()
              .toString();
          }

          // toggle daylight on when sunrise is found
          if (
            $(this)
              .children()
              .text()
              .indexOf("Sunrise") > -1
          ) {
            daylight = true;
          }

          // toggle daylight off when sunset is found
          if (
            $(this)
              .children()
              .text()
              .indexOf("Sunset") > -1
          ) {
            daylight = false;
          }

          // check for low tide row and during daylight, push to location array when found
          if (
            $(this)
              .children(".tide")
              .text()
              .indexOf("Low Tide") > -1 &&
            daylight
          ) {
            output[location].push({
              date: date,
              time: $(this)
                .children(".time")
                .text(),
              height: $(this)
                .children(".metric")
                .text()
            });
          }
        });
      cb(output);
    }
  });
};

module.exports = app;
