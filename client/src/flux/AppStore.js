

class AppStore {
	constructor(dispatcher) {
		this.dispatcher = dispatcher;
		this.value = null;

		this.dispatcher.register(function(payload) {
			if (payload.actionType === 'test') {
				this.value = 'it works!';
			}
		});
	}
}

module.exports = AppStore;