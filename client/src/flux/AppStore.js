import { ActionTypes } from './Actions'

class AppStore {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
		this._isLoading = false;
		this._itineraries = [];

		this.dispatcher.register((payload) => {
			switch (payload.actionType) {
				case ActionTypes.LOAD_DATA:
					this._isLoading = true;
					break;
				case ActionTypes.LOADED_DATA:
					this._isLoading = false;
					this._itineraries.push(payload.data);
					break;
			}
		});
	}
}

module.exports = AppStore;