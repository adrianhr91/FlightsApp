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
      <div key={index}> <Itinerary model={itinerary} /> </div>
    );

    return (
      <div className='itineraries'>{itList}</div>
    );
  }
}

export default ItineraryList;