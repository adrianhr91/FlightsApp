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
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
	}

	loadData() {
		// TODO send parameters to server - check out `server/src/api/server.js`
		this.dispatcher.dispatch(new Action(ActionTypes.LOAD_DATA));
		console.log('fetching results from server...');

    
    
		fetch('http://localhost:4000/api/search?' + this.getQueryString())
		.then((response) => {
			return response.json();
		})
		.then((results) => {
			console.log('TODO: something with these results:');
			this.dispatcher.dispatch(new Action (ActionTypes.LOADED_DATA, results.test));
			console.log(results);
		})
		.catch(console.error);
	}

  getQueryString() {
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
    }

    var queryString =
      Object.keys(queryParams).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
      }).join('&');

    return queryString;
  }
}

export {
	ActionTypes,
	Action,
	ActionsCreator
}