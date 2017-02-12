import { ActionTypes } from './Actions'
const {EventEmitter} = require('fbemitter');

class AppStore {
	constructor(dispatcher) {
		this._isLoading = false;
		this._itineraries = [];
	}

	init(dispatcher) {
		this._emitter = new EventEmitter();
		this._dispatcher = dispatcher;

		this._dispatcher.register((payload) => {
			switch (payload.actionType) {
				case ActionTypes.LOAD_DATA:
					this._isLoading = true;
					this._emitter.emit(ActionTypes.LOADING_STATE_CHANGED);
					break;
				case ActionTypes.LOADED_DATA:
					this._isLoading = false;
					this._itineraries = payload.data;
					this._emitter.emit(ActionTypes.LOADING_STATE_CHANGED);
					this._emitter.emit(ActionTypes.ITINERARIES_STATE_CHANGED);
					break;
			}
		});
	}

	register(actionType, callback) {
		this._emitter.addListener(actionType, callback);
	}

	get isLoading() {
		return this._isLoading;
	}

	get itineraries() {
		return this._itineraries;
	}
}

const appStore = new AppStore();

module.exports = appStore;