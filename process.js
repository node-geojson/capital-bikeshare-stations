var request = require('request'),
  fs = require('fs'),
  cheerio = require('cheerio');

request('http://www.capitalbikeshare.com/data/stations/bikeStations.xml', function(err, res, body) {
  var gj = { type: 'FeatureCollection', features: [] };
  var $ = cheerio.load(body);
  $('station').each(function(i) {
    gj.features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [
          +$('long', this).text(),
          +$('lat', this).text()
        ]
      }
    });
  });
  fs.writeFileSync('stations.geojson', JSON.stringify(gj));
});
