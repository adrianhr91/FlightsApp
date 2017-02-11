import React from 'react';
import appStore from '../../flux/AppStore';
import { ActionTypes } from '../../flux/Actions';
import Itinerary from './Itinerary.js';

class ItineraryList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { itineraries: appStore.itineraries };
		appStore.register(ActionTypes.ITINERARIES_STATE_CHANGED, () => {
			this.setState({ itineraries: appStore.itineraries });
		});
	}

  render() {
		var itList = this.state.itineraries.map((itinerary, index) => 
			<li key={index}> <Itinerary /> </li>
		);

		if(itList.length == 0) {
			return null;
		}

    return (
      <ul>{ itList }</ul>
    );
  }
}

export default ItineraryList;