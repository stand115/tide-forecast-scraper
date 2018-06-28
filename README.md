# tide-forecast-scraper

A simple web scraper for checking tide pools

## Description

Using https://www.tide-forecast.com/, get tide forecasts for these locations:

Half Moon Bay, California
Huntington Beach, California
Providence, Rhode Island
Wrightsville Beach, North Carolina

The forecast page for each location is loaded, and information on low tides (date, time, height) on low tides that occur after sunrise and before sunset is extracted.

### Setup Environment

```bash
npm install
```

### Start the App

```bash
npm start
```

## Testing

Visit http://localhost:4000/scrape in the browser to view the output in JSON format
