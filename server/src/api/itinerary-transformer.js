

class ItineraryTransformer {
	constructor(livePricing) {
		this.livePricing = livePricing;
	}

	get itineraries() {
		var models = [];
		

		for(const itinerary of this.livePricing.Itineraries) {	
			var itineraryModel = {};
			itineraryModel.outboundLeg = this._getLegInfo(itinerary.OutboundLegId);
			itineraryModel.inboundLeg = this._getLegInfo(itinerary.InboundLegId);
			itineraryModel.cheapetsPrice = this._getCheapestPrice(itinerary.PricingOptions);
			models.push(itineraryModel);
		}

		return models;
	}

	_getLegInfo(legId) {
		const leg = this._getLeg(legId)
		var legModel = {};
		legModel.departureTime = leg.Departure;
		legModel.arrivalTime = leg.Arrival;

		return legModel
	}

	_getLeg(legId) {
		for(const leg of this.livePricing.Legs) {
			if(leg.Id == legId) {
				return leg;	
			}
		}
	}

	_getCheapestPrice(pricingOptions) {
		return pricingOptions[0].Price;
	}
}


module.exports = ItineraryTransformer;