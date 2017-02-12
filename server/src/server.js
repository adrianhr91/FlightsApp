require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const api = require('./api/');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
  Simple flight search api wrapper.

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', (req, res) => {

  var livePricing = new api.LivePricing(req.query);
  livePricing.search()
    .then((results) => {
      var transformer = new api.ItineraryTransformer(results);
      var itineraries = transformer.itineraries;
      res.json(itineraries);
    })
    .catch(console.error);
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
