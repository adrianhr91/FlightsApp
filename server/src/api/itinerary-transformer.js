

class ItineraryTransformer {
  constructor(livePricing) {
    this.livePricing = livePricing;
  }

  get itineraries() {
    var models = [];

    for (const itinerary of this.livePricing.Itineraries) {
      var itineraryModel = {};
      itineraryModel.outboundLeg = this._getLegInfo(itinerary.OutboundLegId);
      itineraryModel.inboundLeg = this._getLegInfo(itinerary.InboundLegId);
      itineraryModel.cheapetsPrice = this._getCheapestPrice(itinerary.PricingOptions);
      itineraryModel.cheapestAgenst = this._getCheapestAgentName(itinerary.PricingOptions);
      models.push(itineraryModel);
    }

    return models;
  }

  _getLegInfo(legId) {
    const leg = this._getLeg(legId)
    var legModel = {};
    legModel.departureTime = leg.Departure;
    legModel.arrivalTime = leg.Arrival;
    legModel.duration = leg.Duration;
    legModel.stopsCount = leg.Stops.length;
    legModel.originPlaceCode = this._getPlaceCode(leg.OriginStation);
    legModel.destinationPlaceCode = this._getPlaceCode(leg.DestinationStation);
    legModel.carrierImageUrl = this._getCarrierImageUrl(leg.Carriers[0]); // for sake of simplicity ignoring Legs with multiple carriers

    return legModel
  }

  _getCarrierImageUrl(carrierId) {
    for (const carrier of this.livePricing.Carriers) {
      if (carrier.Id == carrierId) {
        return `https://logos.skyscnr.com/images/airlines/favicon/${carrier.Code}.png`;
      }
    }
  }

  _getPlaceCode(placeId) {
    for (const place of this.livePricing.Places) {
      if (place.Id == placeId) {
        return place.Code;
      }
    }
  }

  _getLeg(legId) {
    for (const leg of this.livePricing.Legs) {
      if (leg.Id == legId) {
        return leg;
      }
    }
  }

  _getCheapestAgentName(pricingOptions) {
    const agentId = pricingOptions[0] // assuming they are sorted by Price

    for (const agent of this.livePricing.Agents) {
      if (agent.Id = agentId) {
        return agent.Name;
      }
    }
  }

  _getCheapestPrice(pricingOptions) {
    return pricingOptions[0].Price;
  }
}


module.exports = ItineraryTransformer;