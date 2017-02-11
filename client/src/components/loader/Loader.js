import React from 'react';
import appStore from '../../flux/AppStore';
import { ActionTypes } from '../../flux/Actions';

class Loader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isVisible: appStore.isLoading };
		appStore.register(ActionTypes.LOADING_STATE_CHANGED, () => {
			this.setState({ isVisible: appStore.isLoading });
		});
	}
	
  render() {
		if(this.state.isVisible) {
				return <img src="/images/load.gif" alt='loading' className='loader' />
		}

		return null;
  }
}

export default Loader;