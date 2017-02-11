import React from 'react';
import Leg from '../leg';
import './Itinerary.css';

class Itinerary extends React.Component {
  render() {
		const itinerary = this.props.model;
    return (
      <div className='itinerary'>
        <Leg model={ itinerary.outboundLeg } />
				<Leg model={ itinerary.inboundLeg }  />
				<span>{ itinerary.cheapetsPrice }</span>
				<span>{ itinerary.cheapestAgenst }</span>
				<a className='select-button' href="#">Select</a>
      </div>
    );
  }
}

export default Itinerary;