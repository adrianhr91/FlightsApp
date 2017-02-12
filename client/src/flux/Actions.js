import moment from 'moment';

class ActionTypes {
	static get LOAD_DATA() {
		return 'load-data';
	}

	static get LOADED_DATA() {
		return 'loaded-data';
	}

	static get LOADING_STATE_CHANGED() {
		return 'loading-state-changed';
	}

	static get ITINERARIES_STATE_CHANGED() {
		return 'itineraries-state-changed';
	}
}

class Action {
	constructor(actionType, data) {
		this.actionType = actionType;
		this.data = data;
	}
}

class ActionsCreator {
	init(dispatcher) {
		this.dispatcher = dispatcher;
	}

  get PAGE_SIZE() {
    return 10;
  }

	loadData(currentItinerariesCount) {
		// TODO send parameters to server - check out `server/src/api/server.js`
		this.dispatcher.dispatch(new Action(ActionTypes.LOAD_DATA));
		console.log('fetching results from server...');

    
    
		fetch('http://localhost:4000/api/search?' + this.getQueryString(currentItinerariesCount))
		.then((response) => {
			return response.json();
		})
		.then((results) => {
			this.dispatcher.dispatch(new Action (ActionTypes.LOADED_DATA, results.test));
			console.log(results);
		})
		.catch(console.error);
	}

  getQueryString(currentItinerariesCount) {
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() + (1 + 7 - fromDate.getDay()) % 7);
    var toDate = new Date(fromDate);
    toDate.setHours(24);

    const fromDateFormat = moment(fromDate).format('YYYY-MM-DD');
    const toDateFormat = moment(toDate).format('YYYY-MM-DD');

    const queryParams = {
      adults: 2,
      class: 'Economy',
      toPlace: 'LHR',
      toDate: toDateFormat,
      fromPlace: 'EDI',
      fromDate: fromDateFormat,
      pageSize: currentItinerariesCount + this.PAGE_SIZE
    }

    var queryString =
      Object.keys(queryParams).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
      }).join('&');

    return queryString;
  }
}

const actionsCreator = new ActionsCreator()

export {
	ActionTypes,
	Action,
	actionsCreator
}