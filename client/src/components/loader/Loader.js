import React from 'react';
import appStore from '../../flux/AppStore';
import { ActionTypes, actionsCreator } from '../../flux/Actions';

class Loader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isLoading: appStore.isLoading };
		appStore.register(ActionTypes.LOADING_STATE_CHANGED, () => {
			this.setState({ isLoading: appStore.isLoading });
		});
	}
	
  render() {
		if(this.state.isLoading) {
				return <img src="/images/load.gif" alt='loading' className='loader' />
		} else {
        return <button onClick={this.loadMore}>Load More</button>
    }
  }

  loadMore() {
    actionsCreator.loadData(appStore.itineraries.length);
  }
}

export default Loader;